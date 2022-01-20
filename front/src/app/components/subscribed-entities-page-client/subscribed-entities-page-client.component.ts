import { Component, OnInit } from '@angular/core';
import { CottageDTO, getAverageCottageGrade } from 'src/app/dto/cottage-dto';
import { getAverageShipGrade, ShipDTO } from 'src/app/dto/ship-dto';
import { Cottage } from 'src/app/model/cottage';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { CottageService } from 'src/app/service/cottage-service.service';
import { ShipService } from 'src/app/service/ship-service';
import { UserService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-subscribed-entities-page-client',
  templateUrl: './subscribed-entities-page-client.component.html',
  styleUrls: ['./subscribed-entities-page-client.component.css']
})
export class SubscribedEntitiesPageClientComponent implements OnInit {

  user: User;

  subscribedCottages: Array<CottageDTO>;
  subscribedShips: Array<ShipDTO>;
  subscribedInstructors: Array<User>;

  constructor(private cottageService: CottageService, private shipService: ShipService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;

      this.cottageService.getUsersSubscribedCottages(this.user.email).subscribe(ret => {
        this.subscribedCottages = new Array<CottageDTO>();
        for (let c of ret) {
          this.subscribedCottages.push(new CottageDTO(c, getAverageCottageGrade(c), c.costPerNight));
        }
      });

      this.shipService.getUsersSubscribedShips(this.user.email).subscribe(ret => {
        this.subscribedShips = new Array<ShipDTO>();
        for (let s of ret) {
          this.subscribedShips.push(new ShipDTO(s, getAverageShipGrade(s), s.costPerNight));
        }
      });

      this.userService.getUsersSubscribedInstructors(this.user.email).subscribe(ret => {
        this.subscribedInstructors = ret;
      });
    });
    
  }

  cancelSubscriptionOfCottage(cottage: Cottage): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.cottageService.isUserSubscribedToCottage(this.user.email, cottage.id).subscribe(ret => {
        if (ret) {
          if (cottage.subscribedUsers != null) {
            let i = 0;
            for (let su of cottage.subscribedUsers) {
              if (su.email === this.user.email) {
                cottage.subscribedUsers.splice(i, 1);
                break;
              }
              i += 1;
            }
          }
          this.cottageService.removeSubscribedUserFromCottage(cottage).subscribe(ret => {
            if(ret) {
              alert("You have successfully canceled your subscription on cottage '" + cottage.name + "'!");
              window.location.reload();
            } else {
              alert("Can't cancel subscription to cottage!");
            }
          });
        } else {
          alert("You were not subscribed on cottage '" + cottage.name + "', so you stay unsubscribed!");
        }
      });
    });
  }

  cancelSubscriptionOfShip(ship: Ship): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.shipService.isUserSubscribedToShip(this.user.email, ship.id).subscribe(ret => {
        if (ret) {
          if (ship.subscribedUsers != null) {
            let i = 0;
            for (let su of ship.subscribedUsers) {
              if (su.email === this.user.email) {
                ship.subscribedUsers.splice(i, 1);
                break;
              }
              i += 1;
            }
          }
          this.shipService.removeSubscribedUserFromShip(ship).subscribe(ret => {
            if(ret) {
              alert("You have successfully canceled your subscription on ship '" + ship.name + "'!");
              window.location.reload();
            } else {
              alert("Can't cancel subscription to ship!");
            }
          });
        } else {
          alert("You were not subscribed on ship '" + ship.name + "', so you stay unsubscribed!");
        }
      });
    });
  }

  cancelSubscriptionOfInstructor(instructor: User): void {
    this.userService.getLoggedUser().subscribe(ret => {
      this.user = ret;
      this.userService.isUserSubscribedToInstructor(this.user.email, instructor.email).subscribe(ret => {
        if (ret) {
          if (instructor.subscribedUsers != null) {
            let i = 0;
            for (let su of instructor.subscribedUsers) {
              if (su.email === this.user.email) {
                instructor.subscribedUsers.splice(i, 1);
                break;
              }
              i += 1;
            }
          }
          this.userService.removeSubscribedUserFromInstructor(instructor).subscribe(ret => {
            if(ret) {
              alert("You have successfully canceled your subscription on instructor '" + instructor.firstName + " " + instructor.lastName + "'!");
              window.location.reload();
            } else {
              alert("Can't cancel subscription to instructor!");
            }
          });
        } else {
          alert("You were not subscribed on instructor '" + instructor.firstName + " " +  instructor.lastName + "', so you stay unsubscribed!");
        }
      });
    });
  }

}
