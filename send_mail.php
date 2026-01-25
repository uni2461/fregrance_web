<?php
// 送信先メールアドレス
// $to = "info@m-parfum.jp";  
$to = "karura810a24@gmail.com";  

// フォームから受け取る値
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

// 件名
$subject = "【お問い合わせ】" . $name . "様より";

// 本文
$body = "お名前: " . $name . "\n"
      . "メールアドレス: " . $email . "\n"
      . "メッセージ:\n" . $message;

// 送信元（From ヘッダー）
// $headers = "From: " . $email;
$headers = "From: no-reply@m-parfum.jp";

// メール送信
mb_language("Japanese");
mb_internal_encoding("UTF-8");

if (mb_send_mail($to, $subject, $body, $headers)) {
    echo "送信が完了しました。";
} else {
    echo "送信に失敗しました。";
}
?>
