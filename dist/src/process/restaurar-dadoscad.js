"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_1 = require("fs");
const csv_parser_1 = require("csv-parser");
const prisma = new client_1.PrismaClient();
async function main() {
    const results = [];
    fs_1.default.createReadStream('/mnt/data/DadosCAD - 2024.csv')
        .pipe((0, csv_parser_1.default)())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
        for (const row of results) {
            try {
                console.log('ROW', row);
                console.log(`Inserted ${row.nome}`);
            }
            catch (error) {
                console.error(`Error inserting ${row.nome}: `, error);
            }
        }
        await prisma.$disconnect();
    });
}
main()
    .catch((e) => {
    console.log('eerror backup ', e);
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=restaurar-dadoscad.js.map