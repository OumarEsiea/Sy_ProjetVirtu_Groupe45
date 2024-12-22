# Dockerisation d'application
<img src="/Images/image.png"/>

# Project setup

Le but de ce projet est de dockeriser une application en appliquant les méthodes vues lors des TD.
Nottament la création en chaîne d'images à l'aide de docker compose et d'avoir une application dont les différents composants
tournent chacuns dans un conteneur et de les faire marcher ensemble.

Pour mon projet j'ai voulu dockeriser un jeu de cartes, que j'ai développé en 3ème année,voici le lien vers celui-ci [MemoryGame](https://github.com/OumarEsiea/Memory-Game/tree/master/v4).

# Règles du jeu

Trouver 3 paires de paires de cartes dans le temps imparti.
A chaque paires trouvées vous gagnerez 1 point.
Au bout de trois paires trouvées vous gagnez la partie.
Chacune des paires de cartes que vous trouverez restera visible.

En revanches a chaque paire invalide vous perdez 1 vie et les paires de cartes trouvées se retourneront.
La partie sera perdue au bout de trois vies perdues.
En clair vous n'avez pas le droit a beaucoup d'erreurs.


# Uitilisation du jeu

<img src="/Images/Instruction.png">

Indiquer la taille du jeu (le nombre de paires de cartes).
Le temps de Mémorisation.
Le temps total de jeu.
Veuillez évidemment a ne pas avoir un temps de mémorisation supérieur au temps de jeu.
Si tout ne marche pas dès le début attendre la fin démarrage de chacun des dockers et relancer une partie. 


## Prérequis du projet

Avoir Docker d'installé.
Il est recommandé d'utiliser Docker Desktop pour avoir une meilleure visualisation de ce qu'il se passe 
au sein de vos conteneurs.


## Execution de l'application
Rendez vous dans répertoire client et tapez :
```
yarn build
```

Rendez vous a la racine du projet ou se trouve le fichier docker-compose.yml et
tapez la commande : 
```
docker-compose up --build -d
```
Tapez l'url suivante sur votre navigateur pour avoir accès a l'application : localhost:80.

# Liste des endpoints de l'API

J'ai implémenté pour ce projet les opérations POST, GET et DELETE dans le fichier index.js ou server.js dans le dossier server.
Ici l'API sera utilisée pour établir des statistique sur le joueur.


### POST

L'opération se fait indirectement, en effet a chaque fin de partie une requête POST sera faite pour mettre en base de données le déroulement de la partie,
Que l'on ait gagné ou pas ainsi que le nombre de paires juste ou fausse trouvées.


### GET

Ici nous allons faire une requête GET en appuyant sur le bouton "Statistiques" situé en bas pour receuillir 
les donnés collectées sur chacune des parties et le mettre en forme.

### DELETE
Si certaines statistiques ne nous conviennent pas on peut les supprimer, c'est que le bouton supprimer présent sur
chacun des cadres permet de faire.

<img src="/Images/image-2.png"/>