import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';

// sets fetch() to go to a fresh mock so that you can assert what would have been sent with fetch in production
beforeEach(() => {
	globalThis.fetch = vi.fn();
});

afterEach(() => {
	vi.clearAllMocks();
});