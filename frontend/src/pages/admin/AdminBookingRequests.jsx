import { useEffect, useState } from "react";
import { Fragment } from "react";
import {
  adminGetBookingRequests,
  adminUpdateBookingRequestStatus
} from "../../lib/api";

export default function AdminBookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState(null);

  const safeText = (v) => (typeof v === "string" && v.trim() ? v : "—");
  const safeNumber = (v) => (typeof v === "number" ? v : null);

  useEffect(() => {
    adminGetBookingRequests()
      .then((data) => setRequests(data || []))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    await adminUpdateBookingRequestStatus(id, status);
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  if (loading) {
    return <div className="p-6">Loading booking requests…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Price Calculator Booking Requests
      </h1>

      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Guest</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Stay</th>
              <th className="p-3">Safari</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Estimated</th>
              <th className="p-3">Confidence</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="11" className="p-3 text-center text-gray-600">
                  No booking requests yet. Requests from Price Calculator will appear here.
                </td>
              </tr>
            )}
            {requests.map((req) => {
              const id = req.id;
              const status = req.status;
              const createdAt = req.created_at || req.createdAt;

              const guestName = req.guest_name ?? req.guestName;
              const guestPhone = req.guest_phone ?? req.guestPhone;
              const guestEmail = req.guest_email ?? req.guestEmail;

              const stayName = req.stay_name ?? null;

              const safariName = req.safari_name ?? null;

              const budgetAmount = Number(req.budget_amount);
              const estimatedTotal = Number(req.estimated_total);
              const confidenceScore = Number(req.confidence_score);

              const guestNameSafe = typeof guestName === "string" ? guestName : "—";
              const guestPhoneSafe = typeof guestPhone === "string" ? guestPhone : "—";
              const guestEmailSafe = typeof guestEmail === "string" ? guestEmail : "—";

              return (
                <tr key={id} className="border-t">
                  <td className="p-3 whitespace-nowrap">
                    {new Date(createdAt || Date.now()).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {guestNameSafe !== "" ? guestNameSafe : "—"}
                  </td>

                  <td className="p-3">
                    {guestPhoneSafe !== "" ? guestPhoneSafe : "—"}
                  </td>

                  <td className="p-3">
                    {guestEmailSafe !== "" ? guestEmailSafe : "—"}
                  </td>

                  <td className="p-3">
                    {safeText(stayName)}
                  </td>

                  <td className="p-3">
                    {safeText(safariName)}
                  </td>

                  <td className="p-3">
                    {Number.isFinite(budgetAmount) && budgetAmount > 0 ? `₹${budgetAmount}` : "—"}
                  </td>

                  <td className="p-3 font-medium text-green-700">
                    {Number.isFinite(estimatedTotal) && estimatedTotal > 0 ? `₹${estimatedTotal}` : "—"}
                  </td>

                  <td className="p-3">
                    {Number.isFinite(confidenceScore) && confidenceScore > 0 ? `${confidenceScore}%` : "—"}
                  </td>

                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-gray-100">
                      {status}
                    </span>
                  </td>

                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="text-blue-600 underline"
                    >
                      View
                    </button>

                    <select
                      value={status}
                      onChange={(e) =>
                        updateStatus(id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedRequest && (() => {
        const modalBudget = Number(selectedRequest.budget_amount);
        const modalEstimated = Number(selectedRequest.estimated_total);
        const modalConfidence = Number(selectedRequest.confidence_score);

        const modalStayName = selectedRequest.stay_name ?? null;

        const modalSafariName = selectedRequest.safari_name ?? null;

        return (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
              <button
                onClick={() => setSelectedRequest(null)}
                className="absolute top-3 right-3 text-gray-500"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">
                Booking Request Details
              </h2>

              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {safeText(selectedRequest.guest_name) !== "—" ? selectedRequest.guest_name : "Guest User"}</div>
                <div><strong>Phone:</strong> {safeText(selectedRequest.guest_phone)}</div>
                <div><strong>Email:</strong> {safeText(selectedRequest.guest_email)}</div>

                <hr />

                <div>
                  <strong>Budget (User):</strong>{" "}
                  {Number.isFinite(modalBudget) && modalBudget > 0
                    ? `₹${modalBudget}`
                    : "—"}
                </div>
                <div>
                  <strong>Estimated Total:</strong>{" "}
                  {Number.isFinite(modalEstimated) && modalEstimated > 0
                    ? `₹${modalEstimated}`
                    : "—"}
                </div>
                <div>
                  <strong>Confidence Score:</strong>{" "}
                  {Number.isFinite(modalConfidence) && modalConfidence > 0
                    ? `${modalConfidence}%`
                    : "—"}
                </div>

                <hr />

                <div>
                  <strong>Stay:</strong> {safeText(modalStayName)}
                </div>
                <div>
                  <strong>Safari:</strong> {safeText(modalSafariName)}
                </div>

                <hr />

                <div>
                  <strong>Guests:</strong>{" "}
                  {(() => {
                    const guestsSummary = selectedRequest.calculator_snapshot?.guestsSummary;
                    if (guestsSummary && typeof guestsSummary === "object") {
                      const adults = Number(guestsSummary.adults || 0);
                      const children = Number(guestsSummary.children || 0);
                      return `${adults} Adults, ${children} Children`;
                    }
                    return "—";
                  })()}
                </div>

                <div>
                  <strong>Extras:</strong>{" "}
                  {(() => {
                    const extras = selectedRequest.calculator_snapshot?.selected?.extras;
                    if (Array.isArray(extras) && extras.every(e => typeof e === "string")) {
                      return extras.join(", ");
                    }
                    return "—";
                  })()}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}