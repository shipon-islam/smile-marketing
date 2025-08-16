import { Skeleton } from "../ui/skeleton";
import { TableBody, TableCell, TableRow } from "../ui/table";

export default function ClientSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, id) => (
        <TableRow key={id}>
          <TableCell>
            <Skeleton className="w-full min-w-36 h-36" />
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
          <TableCell>
            <Skeleton className="w-full h-8" />
          </TableCell>
          <TableCell>
            <div className="grid grid-cols-3 gap-1">
              <Skeleton className="w-full h-8" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
