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
        $queryBuilder = GeneralUtility::makeInstance(ConnectionPool::class)
            ->getQueryBuilderForTable($table);

        return $queryBuilder
            ->select('*')
            ->from($table)
            ->executeQuery()
            ->fetchAllAssociative();
    }
}