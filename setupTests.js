// Nullify env var for tests.
process.env.NEXT_PUBLIC_SITE_URL = undefined

// Force certain date to keep test deterministic.
jest.useFakeTimers('modern');
jest.setSystemTime(new Date(2021, 1, 1));
