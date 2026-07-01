import PyPDF2
import sys
import os

pdf_path = "D:\\2026년\\요양병원시설 대피체계\\요양시설_대피_표준모델.pdf"
txt_path = "D:\\2026년\\요양병원시설 대피체계\\요양시설_대피_표준모델.txt"

def extract_text():
    try:
        # Check if fitz (PyMuPDF) is available, as it's much better.
        try:
            import fitz
            doc = fitz.open(pdf_path)
            text = ""
            for page in doc:
                text += page.get_text() + "\n"
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(text)
            print("Successfully extracted using PyMuPDF (fitz)")
            return
        except ImportError:
            pass

        # Try pdfplumber
        try:
            import pdfplumber
            with pdfplumber.open(pdf_path) as pdf:
                text = ""
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(text)
            print("Successfully extracted using pdfplumber")
            return
        except ImportError:
            pass

        # Fallback to PyPDF2
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            
            with open(txt_path, "w", encoding="utf-8") as f:
                f.write(text)
        print("Successfully extracted using PyPDF2")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_text()
