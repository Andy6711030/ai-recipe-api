export default async function handler(req, res) {
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "Missing keyword" });
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `请生成一道名为「${keyword}」的家常菜谱，包括：
        - 菜名
        - 主要食材列表
        - 调味料
        - 烹饪步骤
        - 烹饪时间与难度
        输出为 JSON 格式。`
      })
    }
  );

  const data = await response.json();
  const text = data[0]?.generated_text || "未生成内容";

  res.status(200).json({ result: text });
}
