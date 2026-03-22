from fastapi import FastAPI, Request, Form, Depends
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import engine, Base, get_db
import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Oyil Boutique")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(request, "index.html")

@app.get("/lookbook", response_class=HTMLResponse)
async def lookbook(request: Request):
    return templates.TemplateResponse(request, "lookbook.html")

COLLECTIONS = {
    "sarees": {
        "title": "Classic Sarees",
        "description": "Experience the timeless elegance of our classic sarees. Expressed through intricate weaves and luxurious pure silks.",
        "hero": "/static/images/sarees.png",
        "items": [
            {
                "name": "Ruby Red Banarasi Silk", 
                "price": "₹28,000", 
                "image": "/static/images/saree_crimson.png",
                "material": "Pure Handwoven Banarasi Silk with Gold Zari",
                "care": "Strictly Dry Clean Only"
            },
            {
                "name": "Pastel Pink Soft Chiffon", 
                "price": "₹16,500", 
                "image": "/static/images/saree_pastel.png",
                "material": "Premium Lightweight Chiffon with Silver Sequins",
                "care": "Gentle Hand Wash / Dry Clean"
            },
            {
                "name": "Golden Zari Treasure", 
                "price": "₹22,500", 
                "image": "/static/images/sarees.png",
                "material": "Heavy Brocade Banarasi Silk",
                "care": "Strictly Dry Clean Only"
            }
        ]
    },
    "salwars": {
        "title": "Modern Salwars",
        "description": "Elegant and comfortable Salwar suits tailored for every festive occasion.",
        "hero": "/static/images/salwars.png",
        "items": [
            {"name": "Pastel Pink Anarkali", "price": "₹12,000", "image": "/static/images/salwars.png"},
            {"name": "Rose Gold Sharara", "price": "₹16,500", "image": "/static/images/salwars.png"},
            {"name": "Ivory Silk Kurta Set", "price": "₹10,500", "image": "/static/images/salwars.png"}
        ]
    },
    "halfsarees": {
        "title": "Traditional Half Sarees",
        "description": "Embrace your roots with our vibrant and youthful half saree collections.",
        "hero": "/static/images/halfsarees.png",
        "items": [
            {"name": "Yellow & Violet Half Saree", "price": "₹14,000", "image": "/static/images/halfsarees.png"},
            {"name": "Gold & Maroon Langa Voni", "price": "₹17,500", "image": "/static/images/halfsarees.png"},
            {"name": "Pure Silk Pattu Pavadai", "price": "₹19,000", "image": "/static/images/halfsarees.png"}
        ]
    },
    "kids": {
        "title": "Kids Collection",
        "description": "High-end ethnic festive wear for the little wonders in your life.",
        "hero": "/static/images/kids.png",
        "items": [
            {"name": "Peach Embroidered Lehenga", "price": "₹8,500", "image": "/static/images/kids.png"},
            {"name": "Royal Blue Kurta Set", "price": "₹6,000", "image": "/static/images/kids.png"},
            {"name": "Gold Zari Pattu Frock", "price": "₹7,500", "image": "/static/images/kids.png"}
        ]
    },
    "festive": {
        "title": "Festive Collections",
        "description": "Vibrant and luxurious wear designed to make every special occasion breathtaking.",
        "hero": "/static/images/festive.png",
        "items": [
            {"name": "Maroon Velvet Gown", "price": "₹28,000", "image": "/static/images/festive.png"},
            {"name": "Gold Threadwork Lehenga", "price": "₹35,000", "image": "/static/images/festive.png"},
            {"name": "Regal Cape Set", "price": "₹22,000", "image": "/static/images/festive.png"}
        ]
    },
    "bridal": {
        "title": "Bridal Wears",
        "description": "Your big day deserves majestic elegance. Explore our luxury bridal masterpiece collection.",
        "hero": "/static/images/bridal.png",
        "items": [
            {"name": "Deep Crimson Bridal Lehenga", "price": "₹85,000", "image": "/static/images/bridal.png"},
            {"name": "Gold & Ruby Heavy Embroidery", "price": "₹1,20,000", "image": "/static/images/bridal.png"},
            {"name": "Majestic Ivory Bridal Wear", "price": "₹95,000", "image": "/static/images/bridal.png"}
        ]
    }
}

@app.get("/collection/{category_id}", response_class=HTMLResponse)
async def collection_detail(request: Request, category_id: str):
    from fastapi.responses import RedirectResponse
    data = COLLECTIONS.get(category_id)
    if not data:
        return RedirectResponse(url="/lookbook")
    return templates.TemplateResponse(request, "collection_detail.html", {"collection": data})

@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse(request, "login.html")

@app.post("/login")
async def process_login(request: Request, identifier: str = Form(...), password: str = Form(...)):
    response = RedirectResponse(url="/lookbook", status_code=302)
    response.set_cookie(key="user_session", value=identifier)
    return response

@app.get("/logout")
async def logout(request: Request):
    response = RedirectResponse(url="/", status_code=302)
    response.delete_cookie("user_session")
    return response

@app.get("/signup", response_class=HTMLResponse)
async def signup_page(request: Request):
    return templates.TemplateResponse(request, "signup.html")

@app.post("/signup")
async def process_signup(request: Request, name: str = Form(...), identifier: str = Form(...), password: str = Form(...)):
    response = RedirectResponse(url="/lookbook", status_code=302)
    response.set_cookie(key="user_session", value=name)
    return response

@app.get("/book-appointment", response_class=HTMLResponse)
async def appointment_form(request: Request):
    return templates.TemplateResponse(request, "appointment.html")

@app.post("/book-appointment")
async def book_appointment(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    date_requested: str = Form(...),
    notes: str = Form(""),
    db: Session = Depends(get_db)
):
    appointment = models.Appointment(
        name=name, email=email, phone=phone, date_requested=date_requested, notes=notes
    )
    db.add(appointment)
    db.commit()
    return templates.TemplateResponse(request, "success.html", {"message": "Your appointment request has been received. We will contact you shortly to confirm."})

@app.get("/our-story", response_class=HTMLResponse)
async def our_story(request: Request):
    return templates.TemplateResponse(request, "our_story.html")

PRODUCTS = [
    {
        "name": "Ruby Red Banarasi Silk",
        "price": "₹28,000",
        "image": "/static/images/saree_crimson.png",
        "material": "Pure Handwoven Banarasi Silk with Gold Zari",
        "care": "Strictly Dry Clean Only",
        "category": "Sarees",
        "category_slug": "sarees",
    },
    {
        "name": "Pastel Pink Soft Chiffon",
        "price": "₹16,500",
        "image": "/static/images/saree_pastel.png",
        "material": "Premium Lightweight Chiffon with Silver Sequins",
        "care": "Gentle Hand Wash / Dry Clean",
        "category": "Sarees",
        "category_slug": "sarees",
    },
    {
        "name": "Golden Zari Treasure",
        "price": "₹22,500",
        "image": "/static/images/sarees.png",
        "material": "Heavy Brocade Banarasi Silk",
        "care": "Strictly Dry Clean Only",
        "category": "Sarees",
        "category_slug": "sarees",
    },
    {
        "name": "Deep Crimson Bridal Lehenga",
        "price": "₹85,000",
        "image": "/static/images/bridal.png",
        "material": "Pure Velvet with Hand Embroidery",
        "care": "Strictly Dry Clean Only",
        "category": "Bridal Wear",
        "category_slug": "bridal",
    },
    {
        "name": "Gold Threadwork Lehenga",
        "price": "₹35,000",
        "image": "/static/images/festive.png",
        "material": "Net with Heavy Gold Threadwork",
        "care": "Dry Clean Only",
        "category": "Festive",
        "category_slug": "festive",
    },
]

@app.get("/product/{product_id}", response_class=HTMLResponse)
async def product_detail(request: Request, product_id: int):
    if product_id < 1 or product_id > len(PRODUCTS):
        return RedirectResponse(url="/lookbook")
    product = PRODUCTS[product_id - 1]
    related_items = [p for p in PRODUCTS if p != product][:3]
    return templates.TemplateResponse(request, "product_detail.html", {
        "product": product,
        "related_items": related_items,
    })

@app.get("/contact", response_class=HTMLResponse)
async def contact_form(request: Request):
    return templates.TemplateResponse(request, "contact.html")

@app.post("/contact")
async def submit_contact(
    request: Request,
    name: str = Form(...),
    email: str = Form(...),
    subject: str = Form(...),
    message: str = Form(...),
    db: Session = Depends(get_db)
):
    contact = models.Contact(
        name=name, email=email, subject=subject, message=message
    )
    db.add(contact)
    db.commit()
    return templates.TemplateResponse(request, "success.html", {"message": "Thank you for contacting us. We will get back to you soon."})
