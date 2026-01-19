import sys
import json
import joblib
import warnings
warnings.filterwarnings('ignore')

model = joblib.load("best_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

text = sys.argv[1]

X = vectorizer.transform([text])
prediction = model.predict(X)[0]

print(json.dumps({
    "is_spam": bool(prediction),
    "result": "Spam" if prediction == 0 else "Not Spam"
}))
