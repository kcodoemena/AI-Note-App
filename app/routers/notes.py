from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import database, models, schemas, sentiment
from ..auth import verify_token

router = APIRouter(
    prefix="/notes",
    tags=["notes"],
    dependencies=[Depends(verify_token)]
)

@router.post("/", response_model=schemas.NoteCreate)
def create_note(note: schemas.NoteCreate, db: Session = Depends(database.get_db)):
    db_note = models.Note(title=note.title, content=note.content)
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/")
def get_notes(db: Session = Depends(database.get_db)):
    return db.query(models.Note).all()

@router.get("/{note_id}/analyze")
def analyze(note_id: int, db: Session = Depends(database.get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return {"sentiment": sentiment.analyze_sentiment(note.content)}
