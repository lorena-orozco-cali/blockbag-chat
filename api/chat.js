module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  const SYSTEM = `Eres el asistente virtual de BlockBag, empresa colombiana fabricante de forros protectores para maletas de viaje. Responde en español, amable y conciso, máximo 3-4 líneas. Si quieren asesor, pide nombre y WhatsApp.

BLOCKBAG: Forros protectores para maletas de viaje, fabricación 100% colombiana, telas resistentes e impermeables, arandelas de seguridad con candado, tallas cabina/mediana/grande, gran variedad de estampados, envíos nacionales a todo Colombia, Instagram @blockbagcali, web blockbag.co`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
        'HTTP-Referer': 'https://blockbag-chat.vercel.app',
        'X-Title': 'BlockBag Asistente'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [{ role: 'system', content: SYSTEM }, ...messages],
        max_tokens: 500
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Disculpa, hubo un error.';
    res.status(200).json({ reply: text });
  } catch (e) {
    res.status(500).json({ reply: 'Escríbenos al WhatsApp de BlockBag. 💛' });
  }
}
