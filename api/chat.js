export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;

  const SYSTEM = `Eres el asistente virtual de BlockBag, empresa colombiana fabricante de forros protectores para maletas de viaje, con sede en Cali, Colombia. Responde siempre en español, de forma amable, cálida y concisa. Máximo 3-4 líneas por respuesta. Cuando el cliente quiera hablar con un asesor, dile que en breve un asesor lo contactará y pídele su nombre y número de contacto.

INFORMACIÓN DE BLOCKBAG:
- Producto: Forros protectores para maletas de viaje
- Fabricación: 100% colombiana
- Calidad: Telas resistentes e impermeables de alta tecnología
- Seguridad: Arandelas de seguridad con candado BlockBag contra robo
- Tallas: Cabina (pequeña), mediana y grande
- Estampados: Gran var
