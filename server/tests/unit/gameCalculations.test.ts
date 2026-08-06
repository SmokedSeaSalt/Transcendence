import { afterAll, describe, expect, it } from "vitest";
import {
	calculateUnitsPM,
	promptCharCount,
} from "../../src/services/gameSessionServices.js";

describe("Room create(), get(), delete", () => {
	it("promptCharCount()", async () => {
		expect(promptCharCount(undefined)).toEqual(0);
		expect(promptCharCount([""])).toEqual(0);
		expect(promptCharCount(["abc"])).toEqual(3);
		expect(promptCharCount(["abc", "def"])).toEqual(7);
		expect(promptCharCount(["hello", "world"])).toEqual(11);
	});

	it("calculateUnitsPM()", async () => {
		expect(calculateUnitsPM(0, undefined)).toEqual(0);
		expect(calculateUnitsPM(5, undefined)).toEqual(0);
		expect(calculateUnitsPM(10, 1)).toEqual(10);
		expect(calculateUnitsPM(10, 0.5)).toEqual(20);
		expect(calculateUnitsPM(1, 0)).toEqual(0);
	});
});
