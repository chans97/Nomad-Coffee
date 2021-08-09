-- CreateTable
CREATE TABLE "_FolloweRelaton" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FolloweRelaton_AB_unique" ON "_FolloweRelaton"("A", "B");

-- CreateIndex
CREATE INDEX "_FolloweRelaton_B_index" ON "_FolloweRelaton"("B");

-- AddForeignKey
ALTER TABLE "_FolloweRelaton" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolloweRelaton" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
