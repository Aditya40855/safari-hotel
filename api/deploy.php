<?php
/**
 * JAWAI UNFILTERED - AUTO DEPLOYMENT SCRIPT
 * Version: 2026.1
 */

// 1. SECURITY: Your Secret Key (Matches your GitHub Webhook 'Secret' or URL key)
$secret_key = 'Aditya@77425'; 
$admin_email = 'adityasingh.aiml@gmail.com';

// 2. AUTHENTICATION CHECK
if (!isset($_GET['key']) || $_GET['key'] !== $secret_key) {
    header('HTTP/1.1 403 Forbidden');
    echo "Access Denied.";
    exit;
}

// 3. EXECUTE DEPLOYMENT
// Navigate to your repo, pull from origin, and capture both success and error messages
$command = "cd " . __DIR__ . " && /usr/local/cpanel/3rdparty/bin/git pull origin main 2>&1";
$output = shell_exec($command);

// 4. PREPARE EMAIL REPORT
$subject = "[Jawai Unfiltered] Deployment ";
$status = (strpos($output, 'Updating') !== false || strpos($output, 'Already up to date') !== false) ? "SUCCESS" : "FAILED";
$subject .= $status;

$message = "Deployment Status: " . $status . "\n";
$message .= "Time: " . date('Y-m-d H:i:s') . "\n";
$message .= "------------------------------------------\n";
$message .= "Console Output:\n" . $output . "\n";
$message .= "------------------------------------------\n";
$message .= "Server: " . $_SERVER['SERVER_NAME'] . "\n";

// 5. SEND EMAIL
$headers = "From: deploy-bot@jawaiunfiltered.com";
mail($admin_email, $subject, $message, $headers); //

// 6. RESPONSE FOR GITHUB
echo "Deployment " . $status;
?>