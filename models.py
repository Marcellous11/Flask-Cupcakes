"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """ Cupcake Model"""
    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,  autoincrement = True,primary_key=True)
    flavor = db.Column(db.String, nullable = False)
    size = db.Column(db.String, nullable = False)
    rating = db.Column(db.Float)
    image = db.Column(db.String, default = 'https://tinyurl.com/demo-cupcake')

    def serialize(self):
        return {
            'id': self.id,
            'flavor': self.flavor,
            'rating': self.rating,
            'size': self.size,
            'image': self.image
        }