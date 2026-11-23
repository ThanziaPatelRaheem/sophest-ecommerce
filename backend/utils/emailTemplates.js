export const getResetPasswordTemplate = (username, resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your Sophest password</title>
</head>

<body style="margin:0;padding:0;background-color:#FAF7EF;font-family:Arial,Helvetica,sans-serif;color:#263D33;">

  <div style="display:none;font-size:1px;color:#FAF7EF;max-height:0;overflow:hidden;">
    Reset your Sophest password securely.
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#FAF7EF;">
    <tr>
      <td align="center" style="padding:48px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;">

          <!-- Brand header -->
          <tr>
            <td align="center" style="padding:0 0 30px;">
              <div style="font-family:Georgia,serif;font-size:34px;letter-spacing:1px;color:#0F3B2E;">
                Sophest
              </div>
              <div style="margin-top:8px;font-size:10px;letter-spacing:3px;color:#A38150;font-weight:bold;">
                EVERYDAY ESSENTIALS
              </div>
            </td>
          </tr>

          <!-- Main content -->
          <tr>
            <td style="background-color:#FFFDF8;border:1px solid #E8DDCC;border-radius:10px;padding:44px 40px;">

              <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;font-weight:bold;color:#A38150;">
                ACCOUNT SECURITY
              </p>

              <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:30px;line-height:1.3;color:#0F3B2E;margin:0 0 24px;">
                Reset your password
              </h1>

              <p style="font-size:15px;line-height:1.8;margin:0 0 18px;">
                Hello ${username},
              </p>

              <p style="font-size:15px;line-height:1.8;margin:0 0 24px;color:#5D6B61;">
                We received a request to reset the password for your Sophest account.
                Click the button below to create a new password.
              </p>

              <!-- Reset button -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding:12px 0 28px;">
                    <a href="${resetUrl}"
                       target="_blank"
                       style="display:inline-block;background-color:#0F3B2E;border:1px solid #0F3B2E;border-radius:5px;padding:16px 32px;color:#FFFFFF;font-size:14px;font-weight:bold;text-decoration:none;">
                      Reset my password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:13px;line-height:1.8;color:#6B756E;margin:0 0 24px;">
                This link is valid for <strong>30 minutes</strong>.
                If you didn't request a password reset, you can safely ignore this email.
              </p>

              <div style="border-top:1px solid #E8DDCC;padding-top:24px;">
                <p style="font-size:12px;line-height:1.8;color:#6B756E;margin:0 0 12px;">
                  Having trouble with the button? Copy and paste this link into your browser:
                </p>

                <p style="font-size:12px;line-height:1.8;margin:0;word-break:break-all;">
                  <a href="${resetUrl}" style="color:#0F3B2E;text-decoration:underline;">
                    ${resetUrl}
                  </a>
                </p>
              </div>

              <p style="font-size:14px;line-height:1.8;color:#5D6B61;margin:30px 0 0;">
                Warm regards,<br />
                <strong style="color:#0F3B2E;">The Sophest Team</strong>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:30px 20px 0;">
              <p style="font-family:Georgia,serif;font-size:20px;color:#0F3B2E;margin:0 0 8px;">
                Sophest
              </p>
              <p style="font-size:10px;letter-spacing:2px;color:#A38150;margin:0 0 18px;">
                EVERYDAY ESSENTIALS
              </p>
              <p style="font-size:12px;line-height:1.7;color:#89938A;margin:0;">
                This is an automated account security email from Sophest.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
