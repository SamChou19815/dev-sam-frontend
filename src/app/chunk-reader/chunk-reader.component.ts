import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../shared/alert/alert.component';
import { GoogleUserService } from '../shared/google-user.service';
import { LoadingOverlayService } from '../shared/overlay/loading-overlay.service';
import { asyncRun, shortDelay } from '../shared/util';
import { AddArticleDialogComponent } from './add-article-dialog/add-article-dialog.component';
import { AnalyzedArticle, RawArticle } from './chunk-reader-data';
import { ChunkReaderNetworkService } from './chunk-reader-network.service';

@Component({
  selector: 'app-chunk-reader',
  templateUrl: './chunk-reader.component.html',
  styleUrls: ['./chunk-reader.component.css']
})
export class ChunkReaderComponent implements OnInit {

  /**
   * A list of articles.
   * @type {AnalyzedArticle[]}
   */
  articles: AnalyzedArticle[] = [];

  /**
   * Convert time to date string.
   *
   * @param {number} t time to convert.
   * @returns {string} the converted date string.
   */
  timeToDateString: (t: number) => string = t => new Date(t).toLocaleDateString();

  constructor(private googleUserService: GoogleUserService,
              private networkService: ChunkReaderNetworkService,
              private loadingService: LoadingOverlayService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    shortDelay(async () => {
      const ref = this.loadingService.open();
      this.networkService.firebaseAuthToken = await this.googleUserService.afterSignedIn();
      this.articles = await this.networkService.loadArticles();
      ref.close();
    });
  }

  /**
   * Open an add article dialog and registers the callback.
   */
  addArticle(): void {
    asyncRun(async () => {
      const value = await this.dialog.open(AddArticleDialogComponent).afterClosed().toPromise();
      if (value == null) {
        return;
      }
      const successful = await this.networkService.analyzeArticle(value as RawArticle);
      const message = successful
        ? `Your article is being analyzed right now. Refresh the page later to see its result.`
        : `Sorry, your article cannot be analyzed for some unknown reasons.
      The failure has been logged in the system and we will try to figure out why.`;
      this.dialog.open(AlertComponent, { data: message });
    });
  }

  /**
   * Delete the given article.
   *
   * @param {AnalyzedArticle} article article to delete.
   * @param {number} index index of the article.
   */
  deleteArticle(article: AnalyzedArticle, index: number): void {
    if (!confirm('Do you really want to delete this article?')) {
      return;
    }
    asyncRun(async () => {
      const ref = this.loadingService.open();
      await this.networkService.deleteArticle(article.key);
      this.articles.splice(index, 1);
      ref.close();
    });
  }

  /**
   * Adjust the number of summaries for the given article.
   *
   * @param {AnalyzedArticle} article article to adjust summary.
   * @param {number} limit the new limit.
   */
  private adjustSummary(article: AnalyzedArticle, limit: number): void {
    asyncRun(async () => {
      const ref = this.loadingService.open();
      article.summaries = await this.networkService.adjustSummary(article.key, limit);
      ref.close();
    });
  }

  /**
   * Fetch less summary for the given article.
   *
   * @param {AnalyzedArticle} article article to adjust summary.
   */
  lessSummary(article: AnalyzedArticle): void {
    this.adjustSummary(article, article.summaries.length - 1);
  }

  /**
   * Fetch more summary for the given article.
   *
   * @param {AnalyzedArticle} article article to adjust summary.
   */
  moreSummary(article: AnalyzedArticle): void {
    this.adjustSummary(article, article.summaries.length + 1);
  }

}
