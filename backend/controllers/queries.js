

// les requete de user
const getAllUsers = "SELECT * FROM utilisateurs"
const getuser = "SELECT * FROM utilisateurs as a WHERE a.id=$1"
const OneUser = "SELECT * FROM utilisateurs WHERE email=$1"
const signup = "INSERT INTO utilisateurs ( nom, email, telephone, adresse, password) VALUES ($1, $2, $3, $4, $5)"
const Login = "SELECT * FROM utilisateurs WHERE email = $1"
const updatepassword ="UPDATE utilisateurs SET password=$1 WHERE  email=$2"
const updateUser ="UPDATE utilisateurs SET nom=$1, email=$2, telephone=$3, adresse=$4"
const profile_user = "UPDATE utilisateurs SET profil=$2  WHERE id=$1"
const getReservaionUser = "SELECT * FROM reservation  WHERE idutili=$1 and ( ($2 BETWEEN  dateentrer and datesortie ) or datesortie=$2) ORDER BY datesortie"
const delete_user = "DELETE FROM utilisateurs WHERE  id=$1"

// querys de appartement
const getAllAppartement = "SELECT * FROM chambres_appartements"
const getOneAppartement = "SELECT * FROM chambres_appartements WHERE idapp=$1"
const select_appartement_porte_rue = "SELECT * FROM chambres_appartements WHERE  rue_app_ch=$1 and porte_app_ch=$2 and  ville_app_ch=$3"
const InsertAppartemen = "INSERT INTO chambres_appartements( rue_app_ch, porte_app_ch, ville_app_ch, description_ch, prix, quartier_app_ch, dateajout)VALUES ( $1, $2, $3, $4, $5, $6, $7);"
const getdeleteAppartement="SELECT * FROM chambres_appartements WHERE id=$1"
const Dlete_appartement = "DELETE FROM public.chambres_appartements WHERE idapp=$1"
const select_app_ch = "SELECT * FROM chambres_appartements WHERE idapp=$1 "
const getappartement_user = "SELECT * FROM chambres_appartements WHERE idutili=$1"
const updateAppartement = "UPDATE chambres_appartements SET  ville_app_ch=$2, rue_app_ch=$3, porte_app_ch=$4, prix=$5, description_ch=$6 WHERE idapp=$1"
const getappartementname ="SELECT DISTINCT ville_app_ch  FROM chambres_appartements"
const getdataappartementname ="SELECT*FROM chambres_appartements WHERE ville_app_ch=$1"

// les appartement reserver par des utilisateurs
const getReservation = "SELECT r.id, nom, email, r.telephone, ville_app_ch, dateentrer,datesortie, r.frais  FROM reservation as r, utilisateurs as u, chambres_appartements as ca WHERE r.idutili= u.id and r.idapp = ca.idapp"
const get0neReservation = "SELECT * FROM reservation WHERE idapp=$1 and reserver=true"
const selet_reserver = "SELECT * FROM reservation  WHERE idapp=$1 and $2  BETWEEN  dateentrer and datesortie  ORDER BY datesortie"
const inserReservation ="INSERT INTO reservation (idapp, idutili, dateentrer, datesortie, datereservation, frais, fraisService, total, telephone)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9 );" 
const updateReservation = "UPDATE reservation SET reserver=$2  WHERE id=$1"
const deleteReservation = "DELETE FROM reservation WHERE id=$1";
// image appartement
const getAllImage ="SELECT images FROM images"
const select_image_app = "SELECT * FROM images WHERE idapp=$1"
const select_image_appOne =  "SELECT * FROM images WHERE idapp=$1 and id=$2 "
const imageAppartement = "INSERT INTO images (idapp, images)  VALUES ( $1, $2)"
const getOneImage = "SELECT * FROM images WHERE and id=$1"
const updatdeImage = "UPDATE images SET images=$2  WHERE idapp=$1 and images=$2"
module.exports = { 
    getAllUsers, getuser, signup, Login, updatepassword, OneUser, updateUser,delete_user,
    // querys des appartements
    getAllAppartement, getOneAppartement, InsertAppartemen, select_appartement_porte_rue, getdeleteAppartement, Dlete_appartement, 
    select_app_ch, updateAppartement, profile_user, getappartement_user, getappartementname, getdataappartementname,
    deleteReservation, select_image_app,get0neReservation, imageAppartement, updatdeImage, select_image_appOne, getOneImage,getAllImage,
    // reservation
    getReservation, selet_reserver, inserReservation, updateReservation, getReservaionUser
}
