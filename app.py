from flask import Flask, request, send_file, send_from_directory
from pptx import Presentation
import pdfplumber
import os
import re

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ----------------------------
# PDF TEXT EXTRACTION
# ----------------------------
def extract_text_from_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            t = page.extract_text()
            if t:
                text += " " + t
    return text


# ----------------------------
# FINAL ANALYSIS LOGIC (FIXED)
# ----------------------------
def analyze_text(text, max_slides=8, bullets_per_slide=4):
    # normalize
    text = re.sub(r'\s+', ' ', text).strip()

    words = text.split()
    bullets = []
    words_per_bullet = 18

    # create enough bullets
    for i in range(0, len(words), words_per_bullet):
        chunk = words[i:i + words_per_bullet]
        if len(chunk) >= 8:
            bullets.append(" ".join(chunk))

    slides = []
    idx = 0

    # guarantee multiple slides
    for i in range(max_slides):
        slide_bullets = bullets[idx:idx + bullets_per_slide]
        if not slide_bullets:
            break

        slides.append({
            "title": f"Overview {i + 1}",
            "bullets": slide_bullets
        })

        idx += bullets_per_slide

    return slides


# ----------------------------
# ROUTES
# ----------------------------
@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/generate", methods=["POST"])
def generate():
    text = request.form.get("text", "").strip()

    # PDF input
    if "pdf" in request.files and request.files["pdf"].filename != "":
        pdf = request.files["pdf"]
        path = os.path.join(UPLOAD_FOLDER, pdf.filename)
        pdf.save(path)
        text = extract_text_from_pdf(path)

    if not text:
        return "No content provided", 400

    max_slides = int(request.form.get("maxSlides", 8))
    bullets_per_slide = int(request.form.get("bulletsPerSlide", 4))

    slides = analyze_text(text, max_slides, bullets_per_slide)

    prs = Presentation()
    layout = prs.slide_layouts[1]  # Title + Content

    for slide in slides:
        s = prs.slides.add_slide(layout)
        s.shapes.title.text = slide["title"]
        s.placeholders[1].text = "\n".join(slide["bullets"])

    output = "Final_Presentation.pptx"
    prs.save(output)

    return send_file(output, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
