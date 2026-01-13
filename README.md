# Country Vote

### Live: 🔗https://countries-theta-jet.vercel.app/

Techs used:
- Nextjs
- Typescript
- Tailwind, Shadcn
- Client side validation: React Hook Form + Zod
- Server side validation: Zod
- Database: Prisma ORM (Postgres) + cloud db (Neon)
  
<br>

## Comments  
- Followed the "Next way" of using server actions to access the database directly from Server Components.  
I did not create a separate API layer for client-side access.

- Kept the server actions file close to where they are used. Other option could be to create a dedicated "actions/" folder.
  
- Used Neon instead of a local Docker database. This cloud instance can act as a shared live development/staging environment.
 
<br>
    
## Entity Diagram

<img width="638" height="746" alt="diagram" src="https://github.com/user-attachments/assets/ac0f3189-a809-471f-b5bb-6ab776b60557" />

  
## Assumptions

- **User Identification & Voting Constraints**  
  In a real-world app, voting would require proper user authentication.  
  Here, the email is just a form field, but the logic still checks if the user has already voted and enforces **one vote per email**.

- **Denormalized vote counter**  
  Each country stores a `votesCount` field that is incremented every time a new vote is created.  
  This avoids running a `COUNT(*)` on the `Vote` table for every request and improves read performance.
  
  💡 Fun fact: Early Instagram famously struggled whenever Justin Bieber posted a photo — the flood of likes would hammer their `COUNT(*)` queries and slow the app down.  
  The team fixed it by **denormalizing like counts**, storing them directly on the post instead of recalculating them each time.  
  In this project it’s not strictly necessary due to the small scale, but it’s a useful **scalability concept** to apply and keep in mind.


- **Full audit trail preserved**  
  Even though the counter is denormalized, the `Vote` table still stores every individual vote.  
  This ensures:
  - Auditing capability  
  - Ability to fully recompute `votesCount` if necessary  
  - Support for future analytics or historical queries  

- **Countries sourced from an external API but persisted in db**  
  The original country data comes from a public API.  
  Since this dataset rarely changes, it is copied into the database at the begginning with the seed.ts.  
  Allows to:
  - Maintain a single source of truth  
  - Avoid relying on external API calls at runtime  
  - Improve stability and performance  
    
- **Top 10 ranking computed server-side**  
  Sorting and selecting the most-voted countries is done server-side to ensure consistency and avoid unnecessary client-side computation.

- **Client-side search**  
  The Figma layout places the search bar directly below the **Top 10 Countries** heading.  
  Because of this, I assumed the search functionality was meant to filter **only the Top 10 results**, not to search across the entire list of countries.  
  The search bar filters countries in-memory on the client. No additional backend calls are triggered.
  
❤️ Hope you like it!  

---

## Notes for local setup 
After cloning the repo, you’ll need to create a `.env` file with your database access keys.    
If we were using a shared staging environment, this `.env` file could be provided privately via ClickUp, Slack, or another secure channel.  
Or send me a messagge if you want to run locally.
  
### Example `.env` file

> ⚠️ Replace the values below with the project credentials.

```env
DATABASE_URL=cloud-instance-url-and-pass-here

```

And then: 
```bash
npm install
npm run dev
