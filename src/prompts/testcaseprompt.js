export const testCaseGenerationPrompt = `You are an expert at creating test cases for competitive programming.

Generate exactly 10 test cases for this problem:

Problem: {problem}
Input Format: {inputFormat}
Output Format: {outputFormat}
Constraints: {constraints}

IMPORTANT: Return ONLY valid JSON array. No markdown, no code blocks, no explanations.
Start directly with [ and end with ].

Test Case Requirements:
- First 2 cases: is_sample=true, is_hidden=false (visible to users)
- Remaining 8 cases: is_sample=false, is_hidden=true (hidden for evaluation)

Include variety:
- 2 simple cases
- 3 edge cases (min/max values, empty, single element)
- 3 corner cases (tricky logic, special patterns)
- 2 large performance cases

Required JSON format:
[
  {{
    "input": "example_input_1",
    "expected_output": "example_output_1",
    "is_sample": true,
    "is_hidden": false,
    "weight": 10,
    "time_limit": 1000,
    "memory_limit": 256,
    "order": 1
  }},
  {{
    "input": "example_input_2",
    "expected_output": "example_output_2",
    "is_sample": true,
    "is_hidden": false,
    "weight": 10,
    "time_limit": 1000,
    "memory_limit": 256,
    "order": 2
  }},
  {{
    "input": "example_input_3",
    "expected_output": "example_output_3",
    "is_sample": false,
    "is_hidden": true,
    "weight": 5,
    "time_limit": 1000,
    "memory_limit": 256,
    "order": 3
  }},
  ...
  {{
    "input": "example_input_10",
    "expected_output": "example_output_10",
    "is_sample": false,
    "is_hidden": true,
    "weight": 5,
    "time_limit": 1000,
    "memory_limit": 256,
    "order": 10
  }}
]

Guidelines:
1. Use \\n for newlines in input/output
2. Sequential order starting from 1
3. Sample cases: weight 10-20
4. Hidden cases: weight 5-15
5. Ensure inputs match the problem's format exactly
6. Verify outputs are correct

Remember: Return ONLY the JSON array, nothing else.`;
