# Réponses aux questions — Partie 2

## Exercice 6 — InternList

**6.1 : ReferenceField génère quel appel HTTP pour résoudre le manager ? Vérifiez dans l'onglet Network de votre navigateur.**

ReferenceField émet une requête `GET /employees/:id` pour chaque `idManager` unique. Par exemple, pour un stagiaire avec `idManager: 1`, React-Admin appelle `GET http://localhost:3002/employees/1`.

**6.2 : Que se passe-t-il visuellement si managerId ne correspond à aucun employé ?**

Si `managerId` ne correspond à aucun employé existant, la colonne manager affiche une cellule vide. Aucune erreur n'est levée visuellement, le champ reste simplement vide.

---

## Exercice 7 — InternCreate & InternEdit

**7.1 : Quelle méthode HTTP est émise lors de la soumission de InternCreate ? Vers quel endpoint ?**

`POST /interns` avec le body contenant les données du formulaire (prenom, nom, email, department, idManager, salary, hasSalary).

**7.2 : Quel hook utilisez-vous pour la validation conditionnelle de remuneration, et pourquoi ?**

La fonction de validation passée dans le tableau `validate` du `NumberInput`, avec la signature `(value, values) => string | undefined`. Le second paramètre `values` contient toutes les valeurs du formulaire (dont `hasSalary`). Cette approche ne nécessite aucun import supplémentaire et est la solution native de React-Admin. Pas besoin d'importer react-hook-form directement.

---

## Exercice 8 — InternShow & ManagerCard

**8.1 : Quelle est la différence entre useGetOne et ReferenceField ? Quand préférer l'un ou l'autre ?**

- `ReferenceField` : composant déclaratif qui s'intègre dans `<Datagrid>`, `<SimpleShowLayout>`, etc. Il gère automatiquement l'affichage du champ référencé (loading, data).
- `useGetOne` : hook impératif qui donne un contrôle total (gestion manuelle des 3 états `isPending` / `error` / `data`). Utilisable dans n'importe quel composant, pas seulement dans les layouts React-Admin.

**Quand préférer l'un ou l'autre ?**
- `ReferenceField` : quand on veut simplement afficher une référence dans une liste ou un détail.
- `useGetOne` : quand on a besoin de logique conditionnelle, de composition custom, ou de gérer finement les états (comme dans `ManagerCard`).

**8.2 : Que se passe-t-il si useGetOne reçoit id: undefined sans l'option enabled ? Comment ce paramètre résout-il le problème ?**

Sans `{ enabled: false }`, `useGetOne` émettrait une requête `GET /employees/undefined` (URL invalide). L'option `enabled` suspend la requête tant que la condition n'est pas remplie :

```tsx
useGetOne("employees", { id: intern?.idManager }, { enabled: !!intern?.idManager })
```

Tant que `intern?.idManager` est `undefined` ou `null`, la requête est bloquée.

---

## Exercice 9 — Enrichissement EmployeeShow

**9.1 : Différence entre useGetList et ReferenceManyField ? Dans quel cas useGetList est-il indispensable ?**

- `ReferenceManyField` : composant déclaratif, lié au record courant via le contexte, s'intègre dans `<Show>` ou `<Edit>`, pagination incluse.
- `useGetList` : hook impératif, flexible, s'utilise dans tout composant (Dashboard, cartes, composants custom).

useGetList est indispensable quand :
- On veut utiliser les données hors d'un contexte React-Admin (Dashboard, composants isolés)
- On a besoin de contrôler précisément la requête (filtres, pagination fine)
- On veut seulement le total sans les données (`perPage: 1`)

**9.2 : Comment optimiser la requête de DepartmentStats pour ne récupérer que le total sans charger tous les employés ?**

En utilisant `pagination: { page: 1, perPage: 1 }`. Cela ne transfère qu'un seul enregistrement, mais React-Admin récupère le header HTTP `x-total-count` qui contient le nombre total de résultats correspondant au filtre. Le `total` retourné par `useGetList` contient cette valeur.

---

## Exercice 10 — QuickStatusToggle

**10.1 : Quelle méthode HTTP useUpdate utilise-t-il par défaut ? Comment forcer PATCH au lieu de PUT ?**

Par défaut, `useUpdate` avec `ra-data-json-server` utilise `PUT /employees/:id`. Pour utiliser `PATCH` à la place, il faut modifier le dataProvider pour remplacer la méthode `PUT` par `PATCH` dans l'implémentation de `update`.

**10.2 : Pourquoi previousData est-il nécessaire dans useUpdate ? Que se passe-t-il si on l'omet ?**

`previousData` permet au dataProvider de connaître l'état précédent du record. Avec `ra-data-json-server`, si on l'omet, la donnée envoyée au PUT peut être incomplète et écraser des champs non spécifiés par `undefined`. Il garantit que seuls les champs modifiés sont pris en compte.

---

## Exercice 11 — useCreate & Formulaire rapide

**11.1 : Quelle différence entre utiliser useCreate dans un composant custom et utiliser le composant <Create> de React-Admin ?**

- `<Create>` : composant déclaratif avec page dédiée, formulaire intégré, validation, redirection automatique après succès.
- `useCreate` : hook bas niveau, pas de UI, pas de navigation automatique. Permet de créer une entrée depuis n'importe où (modale, bouton inline, etc.) sans quitter la page courante.

**11.2 : Comment gérez-vous le rechargement de la liste après une création réussie via useCreate ?**

Dans le callback `onSuccess` de `useCreate`, on appelle `refetch()` provenant de `useListContext()`. Cela invalide le cache React-Query et force le rechargement de la liste courante.

---

## Exercice 12 — Dashboard

**12.1 : Les 4 appels useGetList se font-ils en parallèle ou en séquence ? Justifiez.**

En parallèle. Les 4 appels `useGetList` sont exécutés au même niveau du composant `Dashboard` lors du rendu. React démarre toutes les requêtes simultanément — il n'y a pas de dépendance entre elles.

**12.2 : Pourquoi perPage: 1 est préféré à perPage: 100 ici ?**

`perPage: 1` ne charge qu'un seul enregistrement par requête au lieu de tous. On a uniquement besoin du `total` (extrait du header `x-total-count`), pas des données elles-mêmes. Cela réduit drastiquement le volume de données transférées.
