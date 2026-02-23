<?php
namespace Oskar\CinemaApi\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use TYPO3\CMS\Core\Database\ConnectionPool;
use TYPO3\CMS\Core\Http\JsonResponse;
use TYPO3\CMS\Core\Utility\GeneralUtility;

class ApiMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $path = $request->getUri()->getPath();

        if (strpos($path, '/api/movies') === 0) {
            return new JsonResponse($this->getRecords('tx_cinemaapi_domain_model_movie'));
        }

        if (strpos($path, '/api/snacks') === 0) {
            return new JsonResponse($this->getRecords('tx_cinemaapi_domain_model_snack'));
        }

        if (strpos($path, '/api/screenings') === 0) {
            return new JsonResponse($this->getRecords('tx_cinemaapi_domain_model_screening'));
        }

        return $handler->handle($request);
    }

    private function getRecords(string $table): array
    {
        $pool = GeneralUtility::makeInstance(ConnectionPool::class);
        $queryBuilder = $pool->getQueryBuilderForTable($table);

        $records = $queryBuilder
            ->select('*')
            ->from($table)
            ->executeQuery()
            ->fetchAllAssociative();

        if (in_array($table, ['tx_cinemaapi_domain_model_movie', 'tx_cinemaapi_domain_model_snack'])) {
            foreach ($records as &$record) {
                if (!empty($record['uid']) && ($record['image'] ?? 0) > 0) {
                    $refQb = $pool->getQueryBuilderForTable('sys_file_reference');
                    $ref = $refQb->select('sys_file.identifier')
                        ->from('sys_file_reference')
                        ->join('sys_file_reference', 'sys_file', 'sys_file', 'sys_file_reference.uid_local = sys_file.uid')
                        ->where(
                        $refQb->expr()->eq('tablenames', $refQb->createNamedParameter($table)),
                        $refQb->expr()->eq('fieldname', $refQb->createNamedParameter('image')),
                        $refQb->expr()->eq('uid_foreign', $refQb->createNamedParameter($record['uid']))
                    )
                        ->executeQuery()
                        ->fetchAssociative();

                    if ($ref && !empty($ref['identifier'])) {
                        $record['image'] = 'fileadmin' . $ref['identifier'];
                    }
                    else {
                        $record['image'] = '';
                    }
                }
                else {
                    $record['image'] = '';
                }
            }
        }

        return $records;
    }
}