import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/User';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members!: Member[];
  pagination!: Pagination;
  userParams!: UserParams;
  user!: User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }]

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.userParams = memberService.getUserParams();

    // this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
    //   this.user = user!;
    //   this.userParams = new UserParams(user!);
    // })
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result!;
      this.pagination = response.pagination!;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();;
    this.loadMembers();
  }
}
