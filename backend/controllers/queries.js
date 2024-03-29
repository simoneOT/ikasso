

// les requete de user
const getAllUsers = "SELECT * FROM utilisateurs"
const getuser = "SELECT * FROM utilisateurs as a WHERE a.id=$1"
const OneUser = "SELECT * FROM utilisateurs WHERE id=$1"
const signup = "INSERT INTO utilisateurs ( nom, email, telephone, adresse, password) VALUES ($1, $2, $3, $4, $5)"
const Login = "SELECT * FROM utilisateurs WHERE email = $1 and password=$2"
const updatepassword ="UPDATE utilisateurs SET password=$1 WHERE  email=$2"
const updateUser ="UPDATE utilisateurs SET nom=$1, email=$2, telephone=$3, adresse=$4"
const profile_user = "UPDATE utilisateurs SET profil=$2  WHERE id=$1"

// querys de appartement
const getAllAppartement = "SELECT * FROM chambres_appartements"
const getOneAppartement = "SELECT * FROM chambres_appartements WHERE idapp=$1"
const select_appartement_porte_rue = "SELECT * FROM chambres_appartements WHERE rue_app_ch=$1 and porte_app_ch=$2 and ville_app_ch=$3 and quartier_app_ch=$4"
const InsertAppartemen = "INSERT INTO chambres_appartements(type_app_ch, ville_app_ch, quartier_app_ch, rue_app_ch, porte_app_ch, description_ch, prix, dateajout, idUtili)VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9);"
const getdeleteAppartement="SELECT * FROM chambres_appartements WHERE id=$1"
const Dlete_appartement = "DELETE FROM public.chambres_appartements WHERE id=$1"
const select_app_ch = "SELECT * FROM chambres_appartements WHERE id=$1 and idutili=$2"
const getappartement_user = "SELECT * FROM chambres_appartements WHERE idutili=$1"
const updateAppartement = "UPDATE chambres_appartements SET type_app_ch=$3, ville_app_ch=$4, quartier_app_ch=$5, rue_app_ch=$6, porte_app_ch=$7, description_ch=$8, prix=$9 WHERE id=$1 and idUtili=$2"
const getappartementname ="SELECT DISTINCT ville_app_ch  FROM chambres_appartements"
const getdataappartementname ="SELECT*FROM chambres_appartements WHERE ville_app_ch=$1"

// les appartement reserver par des utilisateurs
const getReservation = "SELECT * FROM reservation WHERE  reserver=$1"
const selet_reserver = "SELECT * FROM reservation  WHERE idapp=$1 and datesortie  BETWEEN $2 and $3  ORDER BY datesortie"
const inserReservation ="INSERT INTO reservation (idapp, idutili, dateentrer, datesortie)VALUES ( $1, $2, $3, $4);" 
const updateReservation= "UPDATE reservation SET reserver=$2  WHERE id=$1"
// image appartement
const select_image_app= "SELECT * FROM images WHERE idapp=$1"
const imageAppartement = "INSERT INTO images (idapp, images)  VALUES ( $1, $2)"
const updatdeImage = "UPDATE images SET images=$2  WHERE id=$1 and idapp=$3"
module.exports = { 
    getAllUsers, getuser, signup, Login, updatepassword, OneUser, updateUser,
    // querys des appartements
    getAllAppartement, getOneAppartement, InsertAppartemen, select_appartement_porte_rue, getdeleteAppartement, Dlete_appartement, 
    select_app_ch,updateAppartement, profile_user, getappartement_user,getappartementname, getdataappartementname,
    // reservation
    getReservation, selet_reserver, inserReservation, updateReservation, select_image_app, imageAppartement, updatdeImage
}
