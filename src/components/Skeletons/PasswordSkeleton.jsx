import { Skeleton } from "../ui/skeleton";
import { TableBody, TableCell, TableRow } from "../ui/table";

export default function PasswordSkeleton({ type }) {
  if (type == "all") {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, id) => (
          <TableRow key={id}>
            <TableCell>
              <Skeleton className="w-full  h-14" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full min-w-32 h-8" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-8" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, id) => (
        <TableRow key={id}>
          <TableCell>
            <Skeleton className="w-full  h-14" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 min-w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-full h-8 min-w-32" />
          </TableCell>

          <TableCell>
            <div className="grid grid-cols-3 gap-1">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
