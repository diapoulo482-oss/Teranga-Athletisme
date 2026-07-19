#!/bin/bash
# =========================================================
# Script de téléchargement des images du site Atelier Bourdin
# À exécuter UNE FOIS depuis le dossier MonSite/
# (nécessite une connexion Internet)
#
# Usage :
#   1. Ouvrir un terminal dans le dossier MonSite/
#   2. Lancer : bash telecharger-images.sh
# =========================================================

cd "$(dirname "$0")/images" || exit 1

echo "Téléchargement des images en cours..."

curl -L -o hero.jpg          "https://images.unsplash.com/photo-1509644851169-2acc08aa25b5?auto=format&fit=crop&w=1600&q=80"
curl -L -o about.jpg         "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?auto=format&fit=crop&w=900&q=80"
curl -L -o portfolio-1.jpg   "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-2.jpg   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-3.jpg   "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-4.jpg   "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-5.jpg   "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-6.jpg   "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-7.jpg   "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=700&q=80"
curl -L -o portfolio-8.jpg   "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=700&q=80"

echo "Terminé ! Les images sont dans le dossier images/."
echo "Pense ensuite à remplacer les liens Unsplash par les chemins locaux"
echo "(images/hero.jpg, images/about.jpg, etc.) dans index.html si tu veux les utiliser en local."
