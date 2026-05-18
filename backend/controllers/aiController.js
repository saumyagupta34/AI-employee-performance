const Employee = require('../models/Employee');
const axios = require('axios');

exports.getRecommendation = async (req, res) => {
  try {
    const { employeeId } = req.body;
    
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const prompt = `
Analyze the following employee's performance data:
- Name: ${employee.name}
- Department: ${employee.department}
- Skills: ${employee.skills.join(', ')}
- Performance Score: ${employee.performanceScore}/100
- Experience: ${employee.experience} years

Based on this data, provide a professional analysis. Your response MUST be in JSON format with the following exact keys:
"promotion_recommendation": (String, should this employee be promoted? why or why not?),
"weak_areas": (String, what needs improvement based on skills and score?),
"suggested_training": (String, what training programs should they undergo?),
"performance_summary": (String, a brief overall summary)
`;

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    
    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key is not configured.' });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // You can change this to your preferred model
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${openRouterApiKey}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Employee Analytics Dashboard',
          'Content-Type': 'application/json',
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    
    // Attempt to parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiResponse);
    } catch (e) {
      // If AI doesn't return pure JSON, we fallback to returning the raw text or trying to extract JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
         return res.json({ raw_response: aiResponse });
      }
    }

    res.json(parsedResponse);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error generating AI recommendation');
  }
};
