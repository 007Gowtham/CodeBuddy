export const questionGenerationPrompt = `You are an expert competitive programming problem setter.

Generate a coding question based on:
- Topic: {topic}
- Level: {level}
- Concepts: {concepts}

IMPORTANT: Return ONLY valid JSON. No markdown, no code blocks, no explanations.
Start directly with {{ and end with }}.

Required JSON format:
{{
  "name": "Problem Title",
  "description": "Clear problem statement explaining what needs to be solved",
  "input_format": "Exact format of input data",
  "output_format": "Exact format of expected output",
  "constraints": "All constraints (e.g., 1 <= n <= 10^5, -1000 <= arr[i] <= 1000)",
  "time_complexity_hint": "Expected time complexity like O(n) or O(n log n)",
  "space_complexity_hint": "Expected space complexity like O(1) or O(n)",
  "tags": ["tag1", "tag2", "tag3"],
  "examples": [
    {{
      "input": "5\\n1 2 3 4 5",
      "output": "15",
      "explanation": "Sum of all elements: 1+2+3+4+5 = 15"
    }},
    {{
      "input": "3\\n10 20 30",
      "output": "60",
      "explanation": "Sum of all elements: 10+20+30 = 60"
    }},
    {{
      "input": "1\\n100",
      "output": "100",
      "explanation": "Single element: 100"
    }}
  ]
}}

Guidelines:
1. Make the problem clear and unambiguous
2. Include realistic constraints
3. Provide 2-3 diverse examples with explanations
4. Use \\n for newlines in input/output strings
5. Ensure tags are relevant to the problem
6. Make it solvable within time/memory limits

Remember: Return ONLY the JSON object, nothing else.`;