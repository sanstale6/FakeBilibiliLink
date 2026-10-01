const BILIBILI_SHARE_API = "https://api.bilibili.com/x/share/click";
const BILIBILI_HOST_PATTERN = /(^|\.)((bilibili\.com)|(hdslb\.com))$/i;

function parseUrlOrNull(raw) {
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

function isConvertibleBilibiliUrl(raw) {
  const url = parseUrlOrNull(raw);
  return Boolean(url && BILIBILI_HOST_PATTERN.test(url.hostname));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { longUrl, buvid } = req.body || {};
  if (!longUrl || !isConvertibleBilibiliUrl(longUrl)) {
    res.status(400).json({ message: "仅支持 bilibili 或 hdslb 域名链接转换" });
    return;
  }

  const form = new URLSearchParams({
    build: "6500300",
    buvid: typeof buvid === "string" && buvid ? buvid : "",
    oid: longUrl,
    platform: "android",
    share_channel: "COPY",
    share_id: "public.webview.0.0.pv",
    share_mode: "3",
  });

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(BILIBILI_SHARE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: form.toString(),
    });
  } catch {
    res.status(502).json({ message: "访问 bilibili 转换接口失败" });
    return;
  }

  let upstreamPayload;
  try {
    upstreamPayload = await upstreamResponse.json();
  } catch {
    res.status(502).json({ message: "bilibili 转换接口返回异常数据" });
    return;
  }

  const shortLink = upstreamPayload?.data?.content;
  if (!upstreamResponse.ok || !shortLink) {
    res.status(502).json({ message: "b23 转换失败，请检查输入链接" });
    return;
  }

  res.status(200).json({ shortLink });
};
