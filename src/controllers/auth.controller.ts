import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { Request, Response } from 'express';

var SECRET = process.env.JWT_SECRET || 'default-secret';

export function register(req: Request, res: Response) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  bcrypt.hash(password, 10, function (err, hashed) {
    if (err) return res.status(500).json({ error: 'Erreur lors du hashage du mot de passe' });

    UserModel.create({ name: name, email: email, password: hashed })
      .then(function (user) {
        res.status(201).json({ message: 'Compte créé avec succès', user: user });
      })
      .catch(function (err) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
      });
  });
}

export function login(req: Request, res: Response) {
  var email = req.body.email;
  var password = req.body.password;

  UserModel.findOne({ email: email })
    .then(function (user) {
      if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });

      bcrypt.compare(password, user.password, function (err, valid) {
        if (err) return res.status(500).json({ error: 'Erreur lors de la vérification' });
        if (!valid) return res.status(400).json({ error: 'Mot de passe invalide' });

        var token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '1d' });
        res.json({ token: token });
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    });
}
