# Chat Interface Structure Guide

## User Experience Flow

### 1. Page Layout Structure
```
┌─────────────────────────────────────┐
│ Header: Audio Headphones RAG Agent │
├─────────────────────────────────────┤
│ Sidebar (25%) │ Main Chat (75%)     │
│ • Budget      │ • Chat Messages     │
│ • Use Case    │ • User Input        │
│ • Image Upload│ • Recommendations   │
│ • Sample Qs   │                     │
└─────────────────────────────────────┘
```

### 2. Sidebar Components
- **Budget Slider**: IDR 1,000,000 - 15,000,000 (step: 500,000)
- **Use Case Dropdown**: commuting, gaming, fitness, work, music, calls
- **Image Upload**: JPG/PNG for ear analysis
- **Sample Queries**: 5 pre-defined questions
- **API Status**: Connection indicator

### 3. Chat Message Structure

#### User Message
- Text content
- Optional uploaded image (200px width)

#### Assistant Response Components (in order):
1. **Confidence Badge**: Color-coded score
2. **Visual Ear Analysis** (if image uploaded)
3. **Product Recommendations** (expandable cards)
4. **Reasoning Text**
5. **Ear-Specific Fit Analysis** (if image uploaded) - Additional recommendations
6. **Sources** (collapsible)

### 4. Visual Ear Analysis Display
```
┌─────────────────────────────────────┐
│ Visual Ear Analysis & Measurements │
├─────────────────────────────────────┤
│ [Image] │ How to Read Analysis      │
│ 150px   │ • Purple Head Bounding Box│
│         │ • Yellow Ear Bounding Box │
│         │ • Blue Headphone Line     │
│         │ • Green Earbud Line       │
│         │ • Green Measurement Lines │
├─────────────────────────────────────┤
│ Ear Canal: 7.2mm │ Concha: 15.3mm │ Size: Medium │
└─────────────────────────────────────┘
```

### 5. Product Recommendation Card Structure
```
┌─────────────────────────────────────┐
│ 1. Sony WF-1000XM5 [EXPANDED]       │
├─────────────────────────────────────┤
│ Details (70%) │ Image (30%)         │
│ • Price: IDR 3,145,000             │
│ • Features: ANC, LDAC, 40h battery │
│ • Why: Best noise cancellation     │
│ • Pros: Advanced ANC, Great sound  │
│ • Cons: Expensive, Complex setup   │
│ • 🛒 Buy Now:                      │
│   [Tokopedia] [Shopee] [TikTok]    │
│                                     │
│                                     │ [Product Image]
│                                     │     150px
└─────────────────────────────────────┘
```

### 6. Ear-Specific Fit Analysis (Additional Recommendations)
```
┌─────────────────────────────────────┐
│ Ear-Specific Fit Analysis        │
├─────────────────────────────────────┤
│ #1 Sony WF-1000XM5 - Fit Score: 95/100 │
│ • Fit Reason: Perfect ear canal match │
│ • Price: IDR 3,145,000              │
│ • Tier Rating: S                     │
├─────────────────────────────────────┤
│ #2 Bose QuietComfort Ultra - Fit: 88/100 │
│ • Fit Reason: Good concha fit       │
│ • Price: IDR 4,200,000              │
│ • Tier Rating: S                     │
└─────────────────────────────────────┘
```

### 7. Data Formatting Rules

#### Price Formatting
- **Input**: Integer (e.g., 3145000)
- **Display**: "IDR 3,145,000" (comma-separated thousands)
- **Fallback**: "N/A" if null/empty

#### Confidence Score
- **High** (≥0.8): Green badge "High (0.85)"
- **Medium** (≥0.6): Yellow badge "Medium (0.72)"
- **Low** (<0.6): Red badge "Low (0.45)"

#### Purchase Links
- **Tokopedia**: Green button (#42b549)
- **Shopee**: Red button (#ee4d2d)
- **TikTok Shop**: Black button (#000000)
- **Others**: Blue button (#667eea)

### 8. Field Mapping (Flexible)
```python
# Handle multiple field names
brand = rec.get('brand', '')
model = rec.get('model', '')
name = rec.get('name', f"{brand} {model}".strip())
features = rec.get('features') or rec.get('key_features') or []
description = rec.get('description') or rec.get('why_recommended') or rec.get('review_summary', '')
```

### 9. Loading States
Progressive status messages (8 seconds each):
1. "Analyzing your request..."
2. "Searching knowledge base..."
3. "Evaluating specifications..."
4. "Comparing earbuds..."
5. "Analyzing ear fit..." (if image)
6. "Composing recommendations..."

### 10. Error Handling
- **API Down**: Red status + retry button
- **No Recommendations**: Warning message + suggestion
- **Missing Fields**: Graceful fallbacks to "N/A"
- **Image Upload Error**: Continue without analysis

### 11. Responsive Breakpoints
- **Desktop**: Sidebar + main content
- **Mobile**: Collapsible sidebar
- **Image Width**: 150px (desktop), 200px (mobile)

## Key Implementation Notes

1. **Session State**: Maintains chat history and API health
2. **Concurrent Processing**: Non-blocking API calls with status updates
3. **CSS Classes**: Custom styling for cards, buttons, confidence scores
4. **Expandable Cards**: First recommendation expanded by default
5. **Brand Colors**: Store-specific button styling
6. **Number Formatting**: Comma-separated thousands for prices
7. **Image Handling**: Base64 encoding for API transmission
