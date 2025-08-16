import { Skeleton } from "../ui/skeleton";
import { TableBody, TableCell, TableRow } from "../ui/table";

export default function ContactsSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, id) => (
        <TableRow key={id}>
          <TableCell>
            <Skeleton className="w-full min-w-32 h-50" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
