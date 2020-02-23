var bcrypt  = require('bcrypt');
var jwt     = require('jsonwebtoken');
var models  =require('../models');
module.exports = {
    register: function(req, res){
        //Params
        var email = req.body.email;
        var mdp = req.body.mdp;
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var anneeEtude = req.body.anneeEtude;
        
        if(email==null || mdp==null || nom==null || prenom==null || anneeEtude==null){
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['email'],
            where: {email: email}
        })
        .then(function(userFound){
            if(!userFound){

                bcrypt.hash(mdp,5,function(err, bcryptedMdp){
                    var newUser = models.User.create({
                        email: email,
                        mdp : bcryptedMdp,
                        nom: nom,
                        prenom: prenom,
                        anneeEtude: anneeEtude

                    })
                    .then(function(newUser){
                        return res.status(201).json({'userId': newUser.id})
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'cannot add user'});
                    });
                })


            }else{
                return res.status(409).json({ 'error': 'user already exist'});
            }
        }).catch(function(err){
            return res.status(500).json({'error': 'unable to verify is user already exist'});
        });

    }

}