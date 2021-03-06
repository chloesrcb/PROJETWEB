var jwtUtils= require('../utils/jwt.utils');
var models  = require('../models');
var matiereCtrl = require('./matiereCtrl');
var colonneCtrl = require('./colonneCtrl');

module.exports = {
    addCase: function(req, res,idLigne,idColonne){
        models.CaseTab.findOne({
            where: {id_Colonne:idColonne,
                id_Ligne:idLigne }
        })
        .then(function(caseFound){
            if(!caseFound){
                var newCase = models.CaseTab.create({
                    estCoche: '0',
                    id_Ligne: idLigne,
                    id_Colonne: idColonne,
                    ColonneId:idColonne,
                    LigneId:idLigne
                })
                .then(function(newCase){
                    /*res.status(200)
                    return res.redirect("/home");*/
                })
                .catch(function(err){
                    return res.status(500).json({'error':'erreur creation case'});
                });
            }else{
                return res.status(409).json({ 'error': 'Case already exists'});
            }
        }).catch(function(err){
            return res.status(500).json({'error': 'erreur detection de la case'});
        });
    },
    getCaseFromId:function(req,res,idItem,callback){
        models.CaseTab.findOne({
            where: {id:idItem}
        })
        .then(function(itemFound){
            if(itemFound){ 
                callback(itemFound);
            }
            else{
                return res.status(409).json({ 'error': 'No Items'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': err});
        });
    },

    modifyItem:function(req,res,idItem,callback){
        models.CaseTab.findOne({
            where: {id:idItem}
        })
        .then(function(itemFound){
            if(itemFound){ 
                itemFound.update({estCoche:!itemFound.dataValues.estCoche});
                callback();
            }
            else{
                return res.status(409).json({ 'error': 'No Items'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': err});
        });
    },

    delCasesFromLigne:function(req,res,idLigne,callback){
        models.CaseTab.destroy({
            where: {id_Ligne:idLigne}
        })
        .then(function(itemFound){
            if(itemFound){
                callback();
            }
            else{
                callback();
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'No Items'});
        });

    },

    delCasesFromColonne:function(req,res,idColonne,callback){
        models.CaseTab.destroy({
            where: {id_Colonne:idColonne}
        })
        .then(function(itemFound){
            if(itemFound){
                callback();
            }
            else{
                callback();
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': 'No Items'});
        });

    },

    getCases:function(req, res,idLigne,tab,callback,i){
        models.CaseTab.findAll({
            where: {id_Ligne:idLigne}
        })
        .then(function(casesFound){
            if(casesFound){
                callback(tab,casesFound,i);
            }
            else{
                return res.status(409).json({ 'error': 'No Cases'});
            }
        })
        .catch(function(err){
            return res.status(500).json({ 'error': err});
        });
    }

}