<?php
$to = "karura810a24@gmail.com";  

$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];

$subject = "【お問い合わせ】" . $name . "様より";

$body = "お名前: " . $name . "\r\n"
      . "メールアドレス: " . $email . "\r\n"
      . "メッセージ:\r\n" . $message;

$headers  = "From: no-reply@m-parfum.jp\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

mb_language("Japanese");
mb_internal_encoding("UTF-8");

if (mb_send_mail($to, $subject, $body, $headers)) {
    echo "送信が完了しました。";
} else {
    echo "送信に失敗しました。";
}
?>
