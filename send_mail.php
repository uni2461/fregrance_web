<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailerの読み込み
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

// POST送信かどうかチェック（直接アクセス防止）
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit('このページは直接表示できません。');
}

// フォームデータ受け取り・XSS対策
$name    = htmlspecialchars($_POST['name'] ?? '', ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES, 'UTF-8');

// 必須項目の空チェック
if ($name === '' || $email === '' || $message === '') {
    exit('入力内容が不足しています。すべての項目を入力してください。');
}

// メール本文の作成
$body = <<<EOT
お名前：{$name}
メールアドレス：{$email}

▼メッセージ
{$message}
EOT;

$mail = new PHPMailer(true);

try {
    // SMTP設定（Xサーバー）
    $mail->isSMTP();
    $mail->Host       = 'sv8290.xserver.jp';       // SMTPサーバー名（あなたの環境に合わせて）
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-reply@m-parfum.jp';    // 送信元メールアドレス
    $mail->Password   = 'yosuke510219';             // 送信元メールのパスワード
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // 文字コード設定
    $mail->CharSet = 'UTF-8';

    // 送信元・送信先設定
    $mail->setFrom('no-reply@m-parfum.jp', 'm-parfum お問い合わせ');
    $mail->addAddress('karura810a24@gmail.com');

    // 返信先（ユーザーのメールアドレス・名前）
    $mail->addReplyTo($email, $name);

    // 件名・本文
    $mail->Subject = '【お問い合わせ】' . $name . '様より';
    $mail->Body    = $body;

    // メール送信
    $mail->send();

    echo '送信が完了しました。';

} catch (Exception $e) {
    echo '送信に失敗しました。';
    // エラー詳細を知りたい場合は下記のコメントを外してください（本番環境では非表示推奨）
    // echo 'Mailer Error: ' . $mail->ErrorInfo;
}
