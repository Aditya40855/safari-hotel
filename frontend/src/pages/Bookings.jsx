
import React, { useEffect, useState, useMemo } from "react";
import { listBookings, getHotelById, getSafariById, deleteBooking } from "../lib/api";
import { useNavigate } from "react-router-dom";


function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");
  const hh = String(dt.getHours()).padStart(2, "0");
  const mm = String(dt.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hh}:${mm}`;
}

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("all"); // all | hotel | safari
  const [search, setSearch] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingId, setDeletingId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    (async () => {
      try {
        const rows = await listBookings();
        if (!mounted) return;

        const enriched = await Promise.all(
          rows.map(async (b) => {
            let itemName = null;
            try {
              if (b.booking_type === "hotel") {
                const h = await getHotelById(b.item_id);
                itemName = h?.name || `Hotel #${b.item_id}`;
              } else if (b.booking_type === "safari") {
                const s = await getSafariById(b.item_id);
                itemName = s?.name || `Safari #${b.item_id}`;
              } else {
                itemName = `Item #${b.item_id}`;
              }
            } catch (err) {
              itemName = `${b.booking_type || "item"} #${b.item_id}`;
            }

            return {
              ...b,
              itemName,
            };
          })
        );

        enriched.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setBookings(enriched);
      } catch (err) {
        console.error("Failed to load bookings:", err);
        if (mounted) setError(err.message || "Failed to load bookings");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [refreshKey]);

  const visible = useMemo(() => {
    return bookings.filter((b) => {
      if (filterType !== "all" && b.booking_type !== filterType) return false;
      if (!search) return true;
      const needle = search.toLowerCase();
      return (
        (b.itemName && b.itemName.toLowerCase().includes(needle)) ||
        (b.contact && String(b.contact).toLowerCase().includes(needle)) ||
        (b.name && b.name.toLowerCase().includes(needle)) ||
        (b.status && b.status.toLowerCase().includes(needle))
      );
    });
  }, [bookings, filterType, search]);

  function exportCsv() {
    const rows = [
      ["id", "type", "item", "start_date", "end_date", "guests", "contact", "name", "status", "created_at"],
      ...visible.map((b) => [
        b.id,
        b.booking_type,
        b.itemName || b.item_id,
        b.start_date || "",
        b.end_date || "",
        b.guests || "",
        b.contact || "",
        b.name || "",
        b.status || "",
        b.created_at || "",
      ]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const u = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = u;
    a.download = `bookings-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(u);
  }

  async function handleCancel(id) {
    if (!confirm("Cancel this booking? This action may be irreversible.")) return;
    setDeletingId(id);
    setError("");
    try {
      await deleteBooking(id);          // uses lib/api deleteBooking -> fetchJson(BASE + /api/bookings/:id)
      // refresh list by bumping key
      setRefreshKey((k) => k + 1);
    } catch (err) {
      console.error("Cancel error:", err);
      // if server returned a helpful message, show it
      setError(err.message || "Failed to cancel booking");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <div className="p-6">Loading bookings…</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bookings</h1>
          <p className="text-sm text-gray-600">View and manage bookings (most recent first)</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => navigate("/")} className="border px-3 py-2 rounded">Home</button>
          <button onClick={exportCsv} className="bg-sky-600 text-white px-3 py-2 rounded">Export CSV</button>
        </div>
      </div>

      <div className="mb-4 flex gap-3 items-center">
        <div>
          <label className="block text-sm">Filter</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="mt-1 border rounded px-3 py-2">
            <option value="all">All types</option>
            <option value="hotel">Hotels</option>
            <option value="safari">Safaris</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm">Search</label>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by hotel/safari, name, contact or status" className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="flex items-end gap-2">
          <button onClick={() => setRefreshKey((k) => k + 1)} className="border px-3 py-2 rounded">Refresh</button>
        </div>
      </div>

      {error && <div className="mb-4 text-red-600">{error}</div>}

      {visible.length === 0 ? (
        <div className="p-6 text-gray-600">No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {visible.map((b) => (
            <div key={b.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="text-sm text-gray-500">#{b.id}</div>
                  <div>
                    <div className="text-lg font-semibold">{b.itemName || `${b.booking_type} #${b.item_id}`}</div>
                    <div className="text-sm text-gray-600">
                      {b.booking_type} · {b.status || "pending"} · created {formatDate(b.created_at)}
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                      <strong>Dates:</strong> {b.start_date || "—"} → {b.end_date || "—"} &nbsp;
                      <strong>Guests:</strong> {b.guests || 1}
                    </div>

                    <div className="mt-2 text-sm text-gray-700">
                      <strong>Contact:</strong> {b.contact || "—"} &nbsp; <strong>Name:</strong> {b.name || "—"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 md:mt-0 md:ml-4 flex gap-2 items-center">
                <button onClick={() => navigate(`/${b.booking_type === "hotel" ? "hotels" : "safaris"}/${b.item_id}`)} className="border px-3 py-2 rounded">
                  View {b.booking_type === "hotel" ? "Hotel" : "Safari"}
                </button>

                <button onClick={() => handleCancel(b.id)} disabled={deletingId === b.id} className="bg-red-600 text-white px-3 py-2 rounded disabled:opacity-60">
                  {deletingId === b.id ? "Cancelling…" : "Cancel"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}