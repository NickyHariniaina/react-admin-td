# employes-admin — TP React-Admin CRUD

## Installation

```sh
npm install
```

## Développement

Lancer l'API simulée :

```sh
npx json-server db.json --port 3002
```

Puis dans un autre terminal :

```sh
npm run dev
```

---

## Exercice pratique — Réponses

### Exo 1 — Configuration

#### 1.1 Que représente le dataProvider dans React-Admin ? Quel est son rôle ?

Le **dataProvider** est un objet qui fait le pont entre React-Admin et l'API REST. Il définit comment envoyer les requêtes HTTP (GET, POST, PUT, DELETE) vers le backend. Chaque méthode du dataProvider (`getList`, `getOne`, `create`, `update`, `delete`) correspond à une opération CRUD. Sans lui, React-Admin ne sait pas où ni comment envoyer les données.

#### 1.2 Quelle requête HTTP est envoyée au chargement de la liste ?

Une requête **GET** vers `http://localhost:3002/employees` avec les paramètres `_sort`, `_order`, `_start`, `_end` et éventuellement `q` pour la recherche. Exemple :
```
GET http://localhost:3002/employees?_sort=id&_order=ASC&_start=0&_end=10
```

---

### Exo 2 — Liste des employés

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

En résumé : `SimpleShowLayout` = vue linéaire simple ; `TabbedShowLayout` = vue organisée par catégories avec des onglets.

---

### Exo 6 — Assemblage final

Le fichier `App.tsx` déclare la ressource `employees` avec les quatre vues :

```tsx
<Resource name="employees" list={EmployeeList} create={EmployeeCreate} edit={EmployeeEdit} show={EmployeeShow}/>
```

Toutes les opérations CRUD (Create, Read, Update, Delete) sont fonctionnelles de bout en bout.
