import { openDB, DBSchema } from 'idb';
import { Goal } from '../models/Goal';
import { JournalEntry } from '../models/JournalEntry';
import { StudySession } from '../models/StudySession';
import { HabitStreak } from '../models/HabitStreak';
import { Summary } from '../models/Summary';
import { Report } from '../models/Report';
import { UserPreferences } from '../models/UserPreferences';

interface ProductivityFlowDB extends DBSchema {
  goals: { key: string; value: Goal };
  journalEntries: { key: string; value: JournalEntry };
  studySessions: { key: string; value: StudySession };
  habitStreaks: { key: string; value: HabitStreak };
  summaries: { key: string; value: Summary };
  reports: { key: string; value: Report };
  preferences: { key: string; value: UserPreferences };
}

const dbPromise = openDB<ProductivityFlowDB>('ProductivityFlowDB', 1, {
  upgrade(db) {
    db.createObjectStore('goals', { keyPath: 'id' });
    db.createObjectStore('journalEntries', { keyPath: 'id' });
    db.createObjectStore('studySessions', { keyPath: 'id' });
    db.createObjectStore('habitStreaks', { keyPath: 'goalId' });
    db.createObjectStore('summaries', { keyPath: 'date' });
    db.createObjectStore('reports', { keyPath: 'id' });
    db.createObjectStore('preferences', { keyPath: 'language' });
  },
});

export const storageService = {
  async put<T>(storeName: keyof ProductivityFlowDB, value: T) {
    const db = await dbPromise;
    await db.put(storeName, value as any);
  },
  async get<T>(storeName: keyof ProductivityFlowDB, key: string) {
    const db = await dbPromise;
    return await db.get(storeName, key) as T | undefined;
  },
  async getAll<T>(storeName: keyof ProductivityFlowDB) {
    const db = await dbPromise;
    return await db.getAll(storeName) as T[];
  },
  async delete(storeName: keyof ProductivityFlowDB, key: string) {
    const db = await dbPromise;
    await db.delete(storeName, key);
  },
};
