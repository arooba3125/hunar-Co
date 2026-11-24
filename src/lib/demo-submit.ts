// DEMO ONLY. Stands in for sending a form to a server.
// It waits briefly so the "submitting" state is visible, then resolves.
// It does not send, log, or store anything. Replace calls to it with a real
// request (for example to Supabase) once a backend exists.
export async function simulateSubmission(delayMs = 800): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
