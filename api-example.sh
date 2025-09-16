#!/bin/bash

# TWS RAG Agent API Examples
# Make sure the API server is running: uv run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

echo "=== TWS RAG Agent API Examples ==="
echo ""

# Health Check
echo "1. Health Check:"
curl -X GET "http://localhost:8000/health"
echo -e "\n\n"

# Basic recommendation without image
echo "2. Basic Recommendation (Text Only):"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=I need TWS earbuds with great ANC for commuting under $200" \
  -F "budget_max=200" \
  -F "use_case=commuting"
echo -e "\n\n"

# Recommendation with budget range
echo "3. Recommendation with Budget Range:"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=Best TWS for audiophiles with excellent sound quality" \
  -F "budget_min=150" \
  -F "budget_max=400" \
  -F "use_case=audiophile"
echo -e "\n\n"

# Gaming recommendation
echo "4. Gaming TWS Recommendation:"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=I need TWS earbuds for gaming with low latency and good microphone" \
  -F "budget_max=300" \
  -F "use_case=gaming"
echo -e "\n\n"

# Fitness recommendation
echo "5. Fitness TWS Recommendation:"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=Best TWS for workouts and running, need water resistance" \
  -F "budget_min=80" \
  -F "budget_max=250" \
  -F "use_case=fitness"
echo -e "\n\n"

# Office/work recommendation
echo "6. Office TWS Recommendation:"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=TWS for office work with multipoint connectivity and transparency mode" \
  -F "budget_max=350" \
  -F "use_case=office"
echo -e "\n\n"

# Travel recommendation
echo "7. Travel TWS Recommendation:"
curl -X POST "http://localhost:8000/recommend" \
  -F "query=Best TWS for long flights with excellent ANC and battery life" \
  -F "budget_min=200" \
  -F "budget_max=500" \
  -F "use_case=travel"
echo -e "\n\n"

# Recommendation with image (if you have an ear photo)
echo "8. Recommendation with Ear Image (uncomment and add your image path):"
# curl -X POST "http://localhost:8000/recommend" \
#   -F "query=Best TWS for my ears" \
#   -F "image=@/path/to/your/ear_photo.jpg" \
#   -F "budget_max=300"
echo "Uncomment the above lines and add your image path to test with ear analysis"
echo -e "\n\n"

# Standalone ear analysis
echo "9. Standalone Ear Analysis (uncomment and add your image path):"
# curl -X POST "http://localhost:8000/analyze-ear" \
#   -F "image=@/path/to/your/ear_photo.jpg"
echo "Uncomment the above lines and add your image path to test ear analysis"
echo -e "\n\n"

# Debug test recommendation
echo "10. Debug Test Recommendation:"
curl -X GET "http://localhost:8000/debug/test-recommendation"
echo -e "\n\n"

echo "=== Examples Complete ==="
echo ""
echo "To test with your own images:"
echo "1. Uncomment the image examples above"
echo "2. Replace '/path/to/your/ear_photo.jpg' with your actual image path"
echo "3. Make sure the image is a clear photo of an ear"
echo ""
echo "Supported image formats: JPG, PNG, WEBP"
echo "Recommended image: Clear side view of ear, good lighting"
