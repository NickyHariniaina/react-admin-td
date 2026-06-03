# STD24033

## Exercice pratique — Réponses

### Exo 1 — Configuration

#### 1.1 Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le **dataProvider** est un objet qui fait le pont entre React-Admin et l'API REST. Il définit comment envoyer les requêtes HTTP (GET, POST, PUT, DELETE) vers le backend. Chaque méthode du dataProvider (`getList`, `getOne`, `create`, `update`, `delete`) correspond à une opération CRUD. Sans lui, React-Admin ne sait pas où ni comment envoyer les données.

#### 1.2 Quelle requête HTTP est envoyée au chargement de la liste ?

Une requête **GET** vers `http://localhost:3002/employees` avec les paramètres `_sort`, `_order`, `_start`, `_end` et éventuellement `q` pour la recherche. Exemple :

---

### Exo 6 — InternList

#### 6.1 ReferenceField génère quel appel HTTP pour résoudre le manager ?

GET /employees/1. Il fait une requête par manager différent dans la liste.

#### 6.2 Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?

La colonne reste vide.

---

### Exo 7 — InternCreate & InternEdit

#### 7.1 Quelle méthode HTTP est émise lors de la soumission de InternCreate ?

POST /interns avec les données du formulaire dans le body.

#### 7.2 Quel hook utilisez-vous pour la validation conditionnelle de remuneration ?

useWatch de react-hook-form. useWatch({ name: "hasSalary" }) réagit en temps réel à la valeur de hasSalary pour rendre la validation du salaire conditionnelle sans dépendre du second paramètre values de la fonction validate.

---

### Exo 8 — InternShow & ManagerCard

#### 8.1 Différence entre useGetOne et ReferenceField ?

ReferenceField est un composant prêt à l'emploi pour une référence dans Datagrid/Show. useGetOne est un hook qui donne le contrôle (gestion de isPending, error, data soi-même). useGetOne est utile quand on veut un affichage custom.

#### 8.2 Que se passe-t-il si useGetOne reçoit id: undefined sans enabled ?

Il envoie GET /employees/undefined (requête invalide). enabled bloque la requête tant que l'id n'est pas défini.

---

### Exo 9 — Enrichissement EmployeeShow

#### 9.1 Différence entre useGetList et ReferenceManyField ?

ReferenceManyField s'utilise dans Show/Edit et gère tout automatiquement. useGetList est utilisable partout, meme dans un Dashboard. useGetList est indispensable en dehors du contexte Show/Edit.

#### 9.2 Comment optimiser la requête de DepartmentStats pour ne récupérer que le total ?

perPage: 1. React-Admin récupère le total depuis l'en-tête x-total-count sans charger tous les employés.

---

### Exo 10 — QuickStatusToggle

#### 10.1 Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH ?

PUT. Pour utiliser PATCH il faut modifier le dataProvider.

#### 10.2 Pourquoi previousData est-il nécessaire dans useUpdate ?

previousData donne l'état précédent au dataProvider. Sans lui, les champs non modifiés risquent d'être écrasés par undefined.

---

### Exo 11 — useCreate & Formulaire rapide

#### 11.1 Différence entre useCreate et le composant Create ?

Create est une page entière avec formulaire et redirection. useCreate est un hook pour creer depuis une modale ou un bouton sans quitter la page.

#### 11.2 Comment recharger la liste après une création via useCreate ?

Avec refetch() de useListContext dans le onSuccess de useCreate.

---

### Exo 12 — Dashboard

#### 12.1 Les 4 appels useGetList se font-ils en parallèle ou en séquence ?

En parallèle. Les 4 hooks sont appelés au meme endroit, React lance toutes les requêtes en meme temps.

#### 12.2 Pourquoi perPage: 1 est préféré à perPage: 100 ?

perPage: 1 charge 1 seul enregistrement au lieu de tous. On a besoin seulement du total, pas des données.

---

#### 2.1 Que fait la prop rowClick="edit" sur le Datagrid ?

Quand on clique sur une ligne du tableau, elle redirige automatiquement vers la page d'édition (`/employees/:id/edit`) de l'employé concerné. C'est un raccourci pour éviter de chercher le bouton Modifier.

#### 2.2 Passez perPage à 2. Que se passe-t-il dans l'interface ?

Le tableau n'affiche plus que **2 employés par page** au lieu de 5. La pagination s'adapte automatiquement : il y aura plus de pages (ex: 5 employés → 3 pages : 2 + 2 + 1). Les boutons de navigation s'ajustent en conséquence.

---

### Exo 3 — Création d'un employé

#### 3.1 Que se passe-t-il si vous soumettez le formulaire sans remplir le prénom ?

Le champ Prénom devient rouge avec un message d'erreur "Required" en dessous. Le formulaire ne s'envoie pas tant que le champ n'est pas rempli, grâce à la validation `required()`.

#### 3.2 Essayez de saisir un salaire de 500 euros. Que se passe-t-il ?

Le champ Salaire affiche une erreur de validation, car 500 < 1500 (la valeur minimale définie par `min='1500'`). Le formulaire ne peut pas être soumis tant que le salaire n'atteint pas au moins 1500.

---

### Exo 4 — Modification d'un employé

#### 4.1 Quelle méthode HTTP est utilisée lors de la sauvegarde d'une modification ?

Une requête **PUT** est envoyée vers `http://localhost:3002/employees/:id` avec les données mises à jour dans le corps de la requête.

#### 4.2 À quel moment useRecordContext() est-il disponible ? Que retourne-t-il si l'enregistrement n'est pas encore chargé ?

`useRecordContext()` est disponible dès que le composant est rendu à l'intérieur d'un `RecordContext` (fourni automatiquement par `<Edit>`, `<Show>`, etc.). Si l'enregistrement n'est pas encore chargé, le hook retourne **`undefined`**. C'est pour ça qu'on fait un `if (!record) return null` dans le composant `EmployeeTitle`.

---

### Exo 5 — Fiche détail

#### 5.1 Quelle différence y a-t-il entre SimpleShowLayout et TabbedShowLayout ?

- **SimpleShowLayout** : affiche tous les champs les uns en dessous des autres, dans une seule colonne, sans onglets.
- **TabbedShowLayout** : permet d'organiser les champs dans plusieurs onglets. Chaque `Tab` regroupe une partie des champs. Utile quand il y a beaucoup d'informations à catégoriser (ex: infos personnelles, infos professionnelles, etc.).

---
