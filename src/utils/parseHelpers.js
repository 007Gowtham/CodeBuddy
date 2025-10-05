export const getResponseText = (response) => {
  if (!response) return "";
  if (Array.isArray(response)) return response.map(r => r.content ?? "").join("\n");
  if (typeof response === "object" && "content" in response) return String(response.content);
  if (typeof response === "object" && "text" in response) return String(response.text);
  return String(response);
};

export const cleanJsonResponse = (text) => {
  if (!text) return "";
  let cleaned = text.trim();
  cleaned = cleaned.replace(/```json\s*/g, "").replace(/```\s*/g, "");
  const jsonStartIndex = cleaned.search(/[\[{]/);
  if (jsonStartIndex > 0) cleaned = cleaned.substring(jsonStartIndex);
  const lastBraceIndex = cleaned.lastIndexOf('}');
  const lastBracketIndex = cleaned.lastIndexOf(']');
  const lastIndex = Math.max(lastBraceIndex, lastBracketIndex);
  if (lastIndex > 0) cleaned = cleaned.substring(0, lastIndex + 1);
  return cleaned;
};

export const safeJsonParse = (text) => {
  try { return JSON.parse(text); } catch (e) { console.log("⚠️ Direct parse failed, trying cleanup..."); }
  try { return JSON.parse(cleanJsonResponse(text)); } catch (e) { console.log("⚠️ Cleaned parse failed, trying fixes..."); }
  try {
    let fixed = cleanJsonResponse(text);
    fixed = fixed.replace(/,(\s*[}\]])/g, '$1');
    return JSON.parse(fixed);
  } catch (e) {
    throw new Error(`Failed to parse JSON: ${e.message}\n\nReceived: ${text.substring(0, 500)}...`);
  }
};
