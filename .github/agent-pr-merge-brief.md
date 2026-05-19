# Brief agent — traitement séquentiel des PR

## Objectif
Traiter et finaliser la file de PR suivante dans cet ordre :
`232 → 219 → 218 → 217 → 216 → 214 → 233 → 225 → 223 → 222`

## Règles d’exécution
1. Toujours traiter **une seule PR à la fois**, dans l’ordre indiqué.
2. Avant tout merge, vérifier strictement :
   - le diff,
   - les checks CI,
   - l’absence de conflit.
3. Merge autorisé uniquement si tout est vert.
4. Pour la PR **#223 (WIP)** :
   - ne pas merger tant qu’elle n’est pas passée en **Ready for review**,
   - puis merger seulement si checks verts + pas de conflit.
5. Méthode de merge attendue : **squash**.
6. En cas de blocage (checks rouges, conflit, manque de droits, doute fonctionnel), **s’arrêter** et demander validation.

## Messages de prise en charge (ordre imposé)
- #232: ✅ Je prends #232 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #219.
- #219: ✅ Je prends #219 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #218.
- #218: ✅ Je prends #218 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #217.
- #217: ✅ Je prends #217 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #216.
- #216: ✅ Je prends #216 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #214.
- #214: ✅ Je prends #214 (deps). Vérification diff/checks/conflits puis merge si vert. Next: #233.
- #233: ✅ Je prends #233 (revue fonctionnelle). Vérification stricte diff/checks/conflits avant merge. Next: #225.
- #225: ✅ Je prends #225 (revue fonctionnelle). Vérification stricte diff/checks/conflits avant merge. Next: #223.
- #223: ✅ Je prends #223 (WIP). Revue en cours, merge uniquement après passage en Ready + checks verts. Next: #222.
- #222: ✅ Je prends #222 (revue fonctionnelle). Vérification stricte diff/checks/conflits avant merge.

## Format de compte-rendu (obligatoire, PR par PR)
Pour chaque PR traitée, fournir :
- **PR** : `#<numéro>`
- **Statut** : `Merged` | `Blocked` | `Skipped`
- **Raison** : explication courte
- **Checks** : lien(s) des checks / run CI
- **Conflits** : `Oui/Non`
- **Action suivante** : prochaine PR à traiter ou demande de validation

## Où coller ce brief
- **Copilot/Cloud Agent** : dans la consigne de la task (prompt/instructions).
- **Issue GitHub dédiée** : en description ou commentaire d’issue.
