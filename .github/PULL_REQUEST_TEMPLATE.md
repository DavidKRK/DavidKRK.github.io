---
name: Pull Request
about: Proposer un changement au projet
title: ''
labels: ''
assignees: ''

---

## 1. Quels sont les changements ?

**Résumé des changements :**

(Décrivez brièvement les modifications apportées.)

**Tickets / Issues liés :**

- Closes #<!-- numéro de l'issue -->
- Ref #<!-- autre ticket lié, si applicable -->

---

## 2. Pourquoi ces changements ?

**Contexte métier :**

(Expliquez la raison fonctionnelle ou business de ces changements.)

**Justification technique :**

(Expliquez les choix d'architecture ou d'implémentation retenus.)

---

## 3. Tests

**Tests unitaires :**
- [ ] Nouveaux tests ajoutés
- [ ] Tests existants mis à jour
- [ ] Tous les tests passent (`npm test` / `bundle exec rspec` / …)

**Tests manuels :**
- [ ] Testé en local
- [ ] Testé sur un environnement de staging / preview

**Performances & Sécurité :**
- [ ] Impact sur les performances évalué
- [ ] Aucune vulnérabilité introduite (dépendances, injection, XSS, …)

---

## 4. Changements majeurs (Breaking Changes)

**Cette PR introduit-elle des ruptures d'API ou de comportement ?**

- [ ] Non
- [ ] Oui — détails ci-dessous :

(Décrivez les ruptures et les impacts pour les consommateurs de l'API / les autres équipes.)

**Instructions de migration :**

(Si applicable, décrivez les étapes nécessaires pour migrer.)

---

## 5. Exigences de déploiement

- [ ] Migrations de base de données à exécuter
- [ ] Nouvelles variables d'environnement à configurer (listez-les ci-dessous)
- [ ] Feature flags à activer / désactiver
- [ ] Services tiers à configurer ou notifier
- [ ] Documentation mise à jour

**Variables d'environnement :**

| Variable | Description | Valeur par défaut |
|----------|-------------|-------------------|
| `NOM_VAR` | Description | `valeur` |

**Notes de déploiement supplémentaires :**

(Toute information utile pour l'équipe de déploiement.)
