const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

const SYSTEM = `Eres el asistente virtual de BlockBag, empresa colombiana fabricante de forros protectores para maletas de viaje, con sede en Cali, Colombia. Responde en español, amable y conciso, máximo 3-4 líneas. Si el cliente quiere asesor, pide su nombre y WhatsApp.

BLOCKBAG:
- Producto: Forros protectores para maletas de viaje
- Fabricación 100% colombiana
- Telas resistentes e impermeables de alta tecnología
- Arandelas de seguridad con candado BlockBag
- Tallas: Cabina, mediana y grande
- Gran variedad de estampados y colores
- Envíos nacionales a todo Colombia, 2-5 días hábiles
- Instagram: @blockbagcali
- Web: blockbag.co
- Por mayor: forros con logo corporativo para empresas`;

app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 500,
        system: SYSTEM,
        messages
      })
    });
    const data = await response.json();
    res.json({ reply: data.content?.[0]?.text || 'Disculpa, hubo un error.' });
  } catch (e) {
    res.status(500).json({ reply: 'Escríbenos al WhatsApp de BlockBag. 💛' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
