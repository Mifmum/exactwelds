# Post-Deploy Verification

1. In Facebook Sharing Debugger, run "Scrape Again" for `https://exactwelds.com/` and `https://exactwelds.com/services`.
2. In LinkedIn Post Inspector, re-scrape `https://exactwelds.com/` and `https://exactwelds.com/services`.
3. Run `curl -I https://exactwelds.com/gallery/hero.jpg` and confirm it returns `301` redirecting to `/og-image.jpg`.
4. Run `curl -I https://exactwelds.com/og-image.jpg` and confirm it returns `200` with `content-type: image/jpeg`.
